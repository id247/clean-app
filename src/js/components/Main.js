'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk';

import App from '../components/App';
import rootReducer from '../reducers/index';

const defaultState = {
	counter: 5,
	posts: [],
	fetching: false,
}

const store = createStore(	rootReducer, 
							defaultState, 
							applyMiddleware(
								thunkMiddleware
							)
						);

function Main(appSettings){		

	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>, 
		document.getElementById('app')
	);
	
};

export default Main;
