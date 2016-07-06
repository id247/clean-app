import { OAuth, API } from '../api';

export const PROFILE_LOGIN_START 	= 'PROFILE_LOGIN_START';
export const PROFILE_LOGIN_SUCCESS 	= 'PROFILE_LOGIN_SUCCESS';
export const PROFILE_LOGIN_FAIL		= 'PROFILE_LOGIN_FAIL';

export function profileLoginStart(meta = {}) {
	return {
		type: PROFILE_LOGIN_START,
		meta: meta
	}
}
export function profileLoginSuccess(meta = {}) {
	return {
		type: PROFILE_LOGIN_SUCCESS,
		meta: meta
	}
}

export function profileLoginFail(meta = {}) {
	return {
		type: PROFILE_LOGIN_FAIL,
		meta: meta
	}
}


export const PROFILE_LOGGED_IN = 'PROFILE_LOGGED_IN';
export const PROFILE_LOGGED_OUT = 'PROFILE_LOGGED_OUT';

export function profileLoggedIn() {
	return {
		type: PROFILE_LOGGED_IN
	}
};
export function profileLoggedOut() {
	return {
		type: PROFILE_LOGGED_OUT
	}
};

export function profileLogin() {
	return dispatch => {
		dispatch(profileLoginStart({loading: true}));
		OAuth.auth()
		.then( () => {
			API.setToken(OAuth.getToken());
			dispatch(profileLoginSuccess({loading: false}));
			dispatch(profileLoggedIn());
			dispatch(profileGetUser());
		})
		.catch( (err) => {
			console.error(err);
			dispatch(profileLoginFail({loading: false}));
		});
	}
};

export function profileLogout() {
	return dispatch => {
		OAuth.deleteToken();
		API.deleteToken();
		dispatch(profileLoggedOut());
		dispatch(profileUnsetUser());
	}
};

export function profileInit() {
	return dispatch => {	
		if (OAuth.getToken()){	
			dispatch(profileLoggedIn());
			dispatch(profileGetUser());
		}else{
			dispatch(profileLogout());
		}
	}
};

export const PROFILE_GET_USER_START 	= 'PROFILE_GET_USER_START';
export const PROFILE_GET_USER_SUCCESS 	= 'PROFILE_GET_USER_SUCCESS';
export const PROFILE_GET_USER_FAIL		= 'PROFILE_GET_USER_FAIL';

export function profileGetUserStart(meta = {}) {
	return {
		type: PROFILE_GET_USER_START,
		meta: meta
	}
}
export function profileGetUserSuccess(meta = {}) {
	return {
		type: PROFILE_GET_USER_SUCCESS,
		meta: meta
	}
}

export function profileGetUserFail(meta = {}) {
	return {
		type: PROFILE_GET_USER_FAIL,
		meta: meta
	}
}

export const PROFILE_SET_USER = 'PROFILE_SET_USER';
export const PROFILE_UNSET_USER = 'PROFILE_UNSET_USER';

export function profileSetUser(payload) {
	return {
		type: PROFILE_SET_USER,
		payload: payload
	}
};
export function profileUnsetUser() {
	return {
		type: PROFILE_UNSET_USER
	}
};

export function profileGetUser() {
	return dispatch => {
		dispatch(profileGetUserStart({loading: true}));
		API.getUserAjax('me')
		.then( user => {
			dispatch(profileGetUserSuccess({loading: false}));
			dispatch(profileSetUser({ user: user }));
		})
		.catch( (err) => {
			console.error(err);
			dispatch(profileGetUserFail({loading: false}));
			dispatch(profileUnsetUser());
			dispatch(profileLogout());
		});
	}
};
