import * as actions from '../actions/api';

const initialState = {
	inProgress: false,
	users: []
}

export function apiAsync(state = false, action) {
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

export function apiUsers(state = [], action) {
	switch (action.type) {
		case actions.API_ADD_USER:
			return [...state, action.payload];			
		default:
			return state;
	}
}

export function api(state = initialState, action) {
	switch (action.type) {
		case actions.API_ASYNC_START:
		case actions.API_ASYNC_SUCCESS:
		case actions.API_ASYNC_FAIL:
			return 	{...state, ...{inProgress: apiAsync(state.inProgress, action) }};

		case actions.API_ADD_USER:
			return 	{...state, ...{users: apiUsers(state.users, action) }};

		default:
			return state;
	}
}
