import React from 'react';
import { connect } from 'react-redux';
import * as profileActions from '../actions/profile';
import * as apiActions from '../actions/api';

import Loading from '../components/Loading';

class App extends React.Component {

	componentWillMount() {
		this.props.profileInit();		
	}

	render() {		
		const { profile } = this.props;

		const login = !profile.loggedIn ? <button onClick={this.props.profileLogin} disabled={profile.loginInProgress}>Login </button> : <button onClick={this.props.profileLogout}>Logout</button>;
		const getUser = !profile.loggedIn ? null : <button onClick={this.props.apiGetUser.bind(null, 100)}>get random user</button>;

		return (
			<div>
				
				{login}
				{getUser}											
				
				<Loading />
			</div>
		);
	}

};

App.contextTypes = {
	store: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
	console.log(state);
	return {
		profile: state.profile,
	}
};

const mapDispatchToProps = { //shorthand for mapDispatchToProps()
	...profileActions,
	...apiActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
