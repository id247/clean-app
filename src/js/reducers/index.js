import { combineReducers } from 'redux';

import { profile } from './profile';
import { loading } from './loading';
import { api } from './api';

const rootReducer = combineReducers({
	profile,
	loading,
	api,
});

export default rootReducer;
