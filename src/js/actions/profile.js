import { OAuth, API } from '../api';

export const PROFILE_LOGIN_START = 'PROFILE_LOGIN_START';
export const PROFILE_LOGIN_SUCCESS = 'PROFILE_LOGIN_SUCCESS';
export const PROFILE_LOGIN_FAIL = 'PROFILE_LOGIN_FAIL';

export function profileLogin() {
	return dispatch => {
		dispatch({
			type: PROFILE_LOGIN_START,
			meta: {
				loading: true
			}
		});
		OAuth.auth()
		.then( () => {
			API.setToken(OAuth.getToken());
			dispatch({
				type: PROFILE_LOGIN_SUCCESS,
				meta: {
					loading: false
				}
			});
			dispatch(profileInit());
		})
		.catch( (err) => {
			console.error(err);
			dispatch({
				type: PROFILE_LOGIN_FAIL,
				meta: {
					loading: false
				}
			});
		});
	}
};


export const PROFILE_LOGOUT = 'PROFILE_LOGOUT';

export function profileLogout() {
	return dispatch => {
		OAuth.deleteToken();
		API.deleteToken();
		dispatch({
			type: PROFILE_LOGOUT,
			payload: false,
		});
	}
};


export const PROFILE_INIT_START = 'PROFILE_INIT_START';
export const PROFILE_INIT_SUCCESS = 'PROFILE_INIT_SUCCESS';
export const PROFILE_INIT_FAIL = 'PROFILE_INIT_FAIL';

/*
get user profile and put in into the store if he is loged in 
or delete profile from the store if he is not logged in
*/
export function profileInit() {
	return dispatch => {	
		dispatch({
			type: PROFILE_INIT_START,
			meta: {
				loading: true
			}
		});
		API.getUserAjax('me')
		.then( user => {
			console.log(user);	
			dispatch({
				type: PROFILE_INIT_SUCCESS,
				payload: user,
				meta: {
					loading: false
				}
			});
		})
		.catch( err => {
			console.log(err);
			dispatch({
				type: PROFILE_INIT_FAIL,
				meta: {
					loading: false
				}
			});
		});
	}
};
