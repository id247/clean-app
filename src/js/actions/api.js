import { API } from '../api';

export const API_ASYNC_START 	= 'API_ASYNC_START';
export const API_ASYNC_SUCCESS 	= 'API_ASYNC_SUCCESS';
export const API_ASYNC_FAIL 	= 'API_ASYNC_FAIL';

export function apiAsyncStart() {
	return {
		type: API_ASYNC_START,
		meta: {
			loading: true
		}
	}
}
export function apiAsyncSuccess() {
	return {
		type: API_ASYNC_SUCCESS,
		meta: {
			loading: false
		}
	}
}
export function apiAsyncFail() {
	return {
		type: API_ASYNC_FAIL,
		meta: {
			loading: false
		}
	}
}


export const API_ADD_USER = 'API_ADD_USER';

export function apiSetUser(payload) {
	return {
		type: API_ADD_USER,
		payload: payload
	}
}


export function apiGetUser(userId) {
	return dispatch => {	
		dispatch(apiAsyncStart());
		
		return API.getUserAjax(userId)
		.then( user => {
			console.log(user);
			dispatch(apiSetUser(user));
			dispatch(apiAsyncSuccess());
		})
		.catch( err => {
			dispatch(apiAsyncFail());
		});
	}
};

