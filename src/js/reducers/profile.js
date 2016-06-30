import { PROFILE_SET_USER, PROFILE_UNSET_USER } from '../actions';

export function profile(state = {}, action) {
	switch (action.type) {
		case PROFILE_SET_USER:
			return 	{...state, 
						...{ 
							user: {
								...state.user, 
								...action.user
							}
						}
					};
		case PROFILE_UNSET_USER:
			return 	{...state, 
						...{ 
							user: false
						}
					};
		default:
			return state;
	}
}
