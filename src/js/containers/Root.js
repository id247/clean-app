import React from 'react';

import App from '../components/App';

let Root = React.createClass({

	componentWillMount: function() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe( () => this.forceUpdate() );
	},

	componentWillUnmount: function() {
		this.unsubscribe();
	},

	render: function() {
		
		return (
			<App />
		);
	}

});

Root.contextTypes = {
	store: React.PropTypes.object
};

export default Root;
