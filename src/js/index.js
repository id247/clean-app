'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import loadingMiddleware from './middlewares/loadingMiddleware';

import App from './components/App';
import rootReducer from './reducers/index';


const store = createStore(	rootReducer, 
							applyMiddleware(
								thunkMiddleware,
								loadingMiddleware,
								loggerMiddleware({collapsed: true}),
							)
						);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('app')
);
