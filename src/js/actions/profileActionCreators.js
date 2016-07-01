import { OAuth, API } from '../api';
import * as actions from './profileActions';

export function profileSetUser(user) {
	return {
		type: actions.PROFILE_SET_USER,
		user: user
	}
};
export function profileUnsetUser() {
	return {
		type: actions.PROFILE_UNSET_USER
	}
};
export function profileSetUserScore(score) {
	return {
		type: actions.PROFILE_SET_USER_SCORE,
		score
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
