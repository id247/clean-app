'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk';

import App from './components/App';
import rootReducer from './reducers/index';

const defaultState = {
	profile: {
		user: false
	},
}

const store = createStore(	rootReducer, 
							defaultState, 
							applyMiddleware(
								thunkMiddleware
							)
						);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('app')
);
