import { OAuth, API } from '../api';

export const PROFILE_ASYNC_START 	= 'PROFILE_ASYNC_START';
export const PROFILE_ASYNC_SUCCESS 	= 'PROFILE_ASYNC_SUCCESS';
export const PROFILE_ASYNC_FAIL 	= 'PROFILE_ASYNC_FAIL';

export function profileAsyncStart() {
	return {
		type: PROFILE_ASYNC_START,
		meta: {
			loading: true
		}
	}
}
export function profileAsyncSuccess() {
	return {
		type: PROFILE_ASYNC_SUCCESS,
		meta: {
			loading: false
		}
	}
}
export function profileAsyncFail() {
	return {
		type: PROFILE_ASYNC_FAIL,
		meta: {
			loading: false
		}
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
	console.log('df');
	return dispatch => {
		dispatch(profileAsyncStart());
		
	console.log('df2');
		return OAuth.auth()
		.then( () => {
			API.setToken(OAuth.getToken());
			dispatch(profileLoggedIn());
			dispatch(profileGetUser());
			dispatch(profileAsyncSuccess());
		})
		.catch( (err) => {
			console.error(err);
			dispatch(profileAsyncFail());
		});
	}
};

export function profileLogout() {
	console.log('df');
	return dispatch => {
		console.log('df2');
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
		dispatch(profileAsyncStart());
		
		return API.getUserAjax('me')
		.then( user => {
			dispatch(profileSetUser(user));
			dispatch(profileAsyncSuccess());
		})
		.catch( (err) => {
			console.error(err);
			dispatch(profileUnsetUser());
			dispatch(profileLogout());
			dispatch(profileAsyncFail());
		});
	}
};
