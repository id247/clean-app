import * as actions from '../actions/profile';

const initialState = {
	loggedIn: false,
	inProgress: false,
	user: {}
}

export function profileAcync(state = false, action) {
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
export function profileLogin(state = false, action) {
	switch (action.type) {
		case actions.PROFILE_LOGGED_IN:
			return 	true;
		case actions.PROFILE_LOGGED_OUT:
			return 	false;
		default:
			return state;
	}
}
export function profileUser(state = false, action) {
	switch (action.type) {
		case actions.PROFILE_SET_USER:
			return 	action.payload;			
		case actions.PROFILE_UNSET_USER:
			return 	{};
		default:
			return state;
	}
}

export function profile(state = initialState, action) {
	switch (action.type) {
		case actions.PROFILE_ASYNC_START:
		case actions.PROFILE_ASYNC_SUCCESS:
		case actions.PROFILE_ASYNC_FAIL:
			return 	{...state, ...{inProgress: profileAcync(state.loggedIn, action) }};

		case actions.PROFILE_LOGGED_IN:
		case actions.PROFILE_LOGGED_OUT:
			return 	{...state, ...{loggedIn: profileLogin(state.loggedIn, action) }};
			
		case actions.PROFILE_SET_USER:
		case actions.PROFILE_UNSET_USER:
			return 	{...state, ...{user: profileUser(state.user, action) }};

		default:
			return state;
	}
}
