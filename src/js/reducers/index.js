const initialState = {
	counter: 5,
	posts: [],
	fetching: false,
	user: 'Чувак',
}

export default function userstate(state = initialState) {
  return state;
}

// import { combineReducers } from 'redux';

// import { counter } from './counter';
// import { posts } from './posts';
// import { fetching } from './fetching';

// const rootReducer = combineReducers({
// 	counter,
// 	posts,
// 	fetching
// });

// export default rootReducer;
