import * as actions from '../actions/profile';

export function profile(state = false, action) {
	switch (action.type) {
		case actions.PROFILE_INIT_SUCCESS:
			return 	action.payload;
		case actions.PROFILE_INIT_FAIL:
			return 	false;
		case actions.PROFILE_LOGOUT:
			return 	false;
		default:
			return state;
	}
}
