import { FETCHING_ENABLE, FETCHING_DISABLE } from '../actions';

export function fetching(state = false, action) {
	switch (action.type) {
		case FETCHING_ENABLE:
			return true;
		case FETCHING_DISABLE:
			return false;
		default:
			return state;
	}
}
