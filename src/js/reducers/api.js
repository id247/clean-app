import * as actions from '../actions/api';

export function posts(state = {}, action) {
	switch (action.type) {
		case actions.API_GET_USER:
			return state;
		default:
			return state;
	}
}
