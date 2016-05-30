import { INCREMENT, DECREMENT } from '../actions';

export function counter(state = 0, action) {
	switch (action.type) {
		case INCREMENT:
			return state + 1;
		case DECREMENT:
			if (state > 0){
				return state - 1;
			}else{
				return state
			}
		default:
			return state
	}
}


