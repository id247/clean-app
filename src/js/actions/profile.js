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
	return dispatch => {
		dispatch(profileAsyncStart());
		
		return OAuth.login()
		.then( () => {
			dispatch(profileLoggedIn());
			dispatch(profileInit());
			dispatch(profileAsyncSuccess());
		})
		.then( 
		null,
		(err) => {
			console.error(err);
			dispatch(profileAsyncFail());
		});
	}
};

export function profileLogout() {
	return dispatch => {
		OAuth.logout();
		dispatch(profileLoggedOut());
		dispatch(profileUnsetUser());
	}
};

export function profileInit() {
	return dispatch => {
		dispatch(profileAsyncStart());
	
		return API.getUser('me')
		.then( user => {
			console.log(user);
			dispatch(profileSetUser(user));
			dispatch(profileLoggedIn());
			dispatch(profileAsyncSuccess());
		})
		.catch( err => {
			dispatch(catchError(err));
		});
	}
};


export function catchError(err){
	console.error(err);
	return dispatch => {	
		if (err.message === 'Unauthorized'){
			dispatch(profileLogout());
		}else{
			//dispatch(errorActions.setError(err.message));
			//dispatch(pageActions.setPageWithoutHistory('error'));
		}
		dispatch(profileAsyncFail());
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

