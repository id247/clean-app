import { combineReducers } from 'redux';

import * as actions from '../actions/api';

export function inProgress(state = false, action) {
	switch (action.type) {
		case actions.API_ASYNC_START:
			return 	true;
		case actions.API_ASYNC_SUCCESS:
		case actions.API_ASYNC_FAIL:
			return 	false;
		default:
			return state;
	}
}

export function users(state = [], action) {
	switch (action.type) {
		case actions.API_ADD_USER:
			return [...state, action.payload];			
		default:
			return state;
	}
}

export const api = combineReducers({
	inProgress,
	users,
});
