import * as actions from '../actions/profileActions';

export function profile(state = {}, action) {
	switch (action.type) {
		case actions.PROFILE_SET_USER:
			return 	action.user;
		case actions.PROFILE_UNSET_USER:
			return 	false;
		case actions.PROFILE_SET_USER_SCORE:
			return 	{...state, ...{score: ( state.score || 0 ) + action.score} };
		default:
			return state;
	}
}
