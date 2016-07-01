import { OAuth, API } from '../api';
import * as actions from './apiActions';

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
