import { API } from '../api';
export const API_GET_USER = 'API_GET_USER';

export function apiGetUser(userId) {
	return dispatch => {	
		API.getUserAjax(userId)
		.then( user => {
			console.log(user);
		})
		.catch( err => {
			console.error(err);
		});
	}
};
