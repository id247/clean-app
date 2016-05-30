import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions';

export function posts(state = {}, action) {
	switch (action.type) {
		case REQUEST_POSTS:
			return state;
		case RECEIVE_POSTS:	
			return [...state, ...action.posts];
		default:
			return state;
	}
}
