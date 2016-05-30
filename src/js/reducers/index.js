import { combineReducers } from 'redux';

import { counter } from './counter';
import { posts } from './posts';
import { fetching } from './fetching';

const rootReducer = combineReducers({
	counter,
	posts,
	fetching
});

export default rootReducer;
