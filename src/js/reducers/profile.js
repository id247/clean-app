import { combineReducers } from 'redux';

import * as actions from '../actions/profile';

export function inProgress(state = false, action) {
	switch (action.type) {
		case actions.PROFILE_ASYNC_START:
			return 	true;
		case actions.PROFILE_ASYNC_SUCCESS:
		case actions.PROFILE_ASYNC_FAIL:
			return 	false;
		default:
			return state;
	}
}
export function loggedIn(state = false, action) {
	switch (action.type) {
		case actions.PROFILE_LOGGED_IN:
			return 	true;
		case actions.PROFILE_LOGGED_OUT:
			return 	false;
		default:
			return state;
	}
}
export function user(state = false, action) {
	switch (action.type) {
		case actions.PROFILE_SET_USER:
			return 	action.payload;			
		case actions.PROFILE_UNSET_USER:
			return 	{};
		default:
			return state;
	}
}

export const profile = combineReducers({
	inProgress,
	loggedIn,
	user,
});
