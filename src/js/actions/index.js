import fetch from 'isomorphic-fetch';
import { OAuth, API } from '../api';

// Api
export function apiGetUser(userId) {
	return dispatch => {	
		API.getUserAjax(userId)
		.then(
			user => {
				console.log(user);
			}
		)
		.catch(
			err => {
				console.error(err);
			}
		);
	}
};


//profile
export const PROFILE_SET_USER = 'PROFILE_SET_USER';
export const PROFILE_UNSET_USER = 'PROFILE_UNSET_USER';


export function profileSetUser(user) {
	return {
		type: PROFILE_SET_USER,
		user: user
	}
};
export function profileUnsetUser() {
	return {
		type: PROFILE_UNSET_USER
	}
};

export function profileLogin() {
	return dispatch => {
		OAuth.auth()
		.then( 
			() => {
				API.setToken( OAuth.getToken());
				dispatch(profileInit());
			}
		)
		.catch( 
			(err) => {
				console.error(err);
			}
		);
	}
};
export function profileLogout() {
	return dispatch => {
		OAuth.deleteToken();
		dispatch(profileUnsetUser());
	}
};

export function profileInit() {
	return dispatch => {	
		API.getUserAjax('me')
		.then(
			user => {
				console.log(user);
				dispatch(profileSetUser(user));
			}
		)
		.catch(
			err => {
				console.log(err);
				dispatch(profileUnsetUser());
			}
		);
	}
};

// OAuth.init(OAuthOptions);

// API.init(APIoptions);
// API.setToken( OAuth.getToken() );
