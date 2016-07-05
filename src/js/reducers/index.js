import { combineReducers } from 'redux';

import { profile } from './profile';
import { loading } from './loading';

const rootReducer = combineReducers({
	profile,
	loading,
});

export default rootReducer;
