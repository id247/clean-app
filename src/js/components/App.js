import React from 'react';
import { connect } from 'react-redux';
import { oAuthLogin, apiGetUser, profileLogin, profileLogout, profileInit  } from '../actions';

let App = React.createClass({

	componentWillMount: function() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe( () => this.forceUpdate() );

		this.props.onProfileInit();		
	},
	componentDidMount: function() {

	},

	componentWillUnmount: function() {
		this.unsubscribe();
	},

	render: function() {
		
		const { store } = this.context;
		const state = store.getState();

		const login = !this.props.profile.user ? <button onClick={this.props.onLogin}>Login</button> : <button onClick={this.props.onLogout}>Logout</button>;
		
		return (
			<div>
				{login}
				<button onClick={this.props.onApiGetUser.bind(this, 100)}>get random user</button>				
			</div>
		);
	}

});

App.contextTypes = {
	store: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
	console.log(state);
	return {
		profile: state.profile
	}
};


App = connect(
	mapStateToProps,
	{ //shorthand for mapDispatchToProps()
		onOAuthLogin: oAuthLogin,
		onApiGetUser: apiGetUser,
		onProfileInit: profileInit,
		onLogin: profileLogin,
		onLogout: profileLogout,
	}
)(App);

export default App;
