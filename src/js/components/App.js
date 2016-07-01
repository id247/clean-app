import React from 'react';
import { connect } from 'react-redux';
import * as profileActionCreators from '../actions/profileActionCreators';
import * as apiActionCreators from '../actions/apiActionCreators';

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
		
		return (
			<div>
				{login}
				<button onClick={this.props.apiGetUser.bind(null, 100)}>get random user</button>				
				<button onClick={this.props.profileSetUserScore.bind(null, 100)}>set user score 100</button>				
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

const mapDispatchToProps = { //shorthand for mapDispatchToProps()
	...profileActionCreators,
	...apiActionCreators,
};

App = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default App;
