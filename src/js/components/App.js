import React from 'react';
import ReactDOM from 'react-dom';

import Counter from '../components/Counter';

const App = React.createClass({

	componentDidMount: function() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe( () => this.forceUpdate() );
	},

	componentWillUnmount: function() {
		this.unsubscribe();
	},

	render: function() {
		
		const { store } = this.context;
		const state = store.getState();
		
		return (
			<div>
				<Counter />
			</div>
		);
	}

});
App.contextTypes = {
	store: React.PropTypes.object
};

export default App;
