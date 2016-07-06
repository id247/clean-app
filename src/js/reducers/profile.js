import * as actions from '../actions/profile';

const initialState = {
	loggedIn: false,
	inProgress: false,
	user: {}
}

export function profile(state = initialState, action) {
	switch (action.type) {
		case actions.PROFILE_LOGIN_START:
			return 	{...state, ...{inProgress: true }};
		case actions.PROFILE_LOGIN_SUCCESS:
			return 	{...state, ...{inProgress: false }};
		case actions.PROFILE_LOGIN_FAIL:
			return 	{...state, ...{inProgress: false }};
		case actions.PROFILE_LOGGED_IN:
			return 	{...state, ...{loggedIn: true }};
		case actions.PROFILE_LOGGED_OUT:
			return 	{...state, ...{loggedIn: false }};

		case actions.PROFILE_GET_USER_START:
			return 	{...state, ...{inProgress: true }};
		case actions.PROFILE_GET_USER_SUCCESS:
			return 	{...state, ...{inProgress: false }};
		case actions.PROFILE_GET_USER_FAIL:
			return 	{...state, ...{inProgress: false }};
			
		case actions.PROFILE_SET_USER:
			return 	{...state, ...action.payload};			
		case actions.PROFILE_UNSET_USER:
			return 	{...state, ...{user: {}}};
		default:
			return state;
	}
}
