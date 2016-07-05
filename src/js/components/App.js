import React from 'react';
import { connect } from 'react-redux';
import * as profileActionCreators from '../actions/profile';
import * as apiActionCreators from '../actions/api';

import Loading from '../components/Loading';

let App = React.createClass({

	componentWillMount: function() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe( () => this.forceUpdate() );

		this.props.profileInit();		
	},
	componentDidMount: function() {

	},

	componentWillUnmount: function() {
		this.unsubscribe();
	},

	render: function() {
		
		const { store } = this.context;
		const state = store.getState();

		const login = !this.props.profile ? <button onClick={this.props.profileLogin}>Login</button> : <button onClick={this.props.profileLogout}>Logout</button>;
		const getUser = !this.props.profile ? null : <button onClick={this.props.apiGetUser.bind(null, 100)}>get random user</button>;

		return (
			<div>
				
				{login}
				{getUser}
											
				
				<Loading />
			</div>
		);
	}

});

App.contextTypes = {
	store: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
	return {
		profile: state.profile,
	}
};

const mapDispatchToProps = { //shorthand for mapDispatchToProps()
	...profileActionCreators,
	...apiActionCreators,
};

App = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default App;
