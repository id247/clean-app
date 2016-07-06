import React from 'react';
import { connect } from 'react-redux';
import * as profileActions from '../actions/profile';
import * as apiActions from '../actions/api';

import Loading from '../components/Loading';

class App extends React.Component {

	constructor(props) {
    	super(props);
	}

	componentWillMount() {
		this.props.profileInit();		
	}

	_getUser(event, userId){
		const { target } = event;
		target.disabled = true;
		
		this.props.apiGetUser(userId)
		.then( () => { target.disabled = false; })
	}

	render() {	
		const { profile, api } = this.props;

		const login = !profile.loggedIn ? <button onClick={this.props.profileLogin} disabled={profile.inProgress}>Login </button> : <button onClick={this.props.profileLogout}>Logout</button>;
		const getUser1 = !profile.loggedIn ? null : <button onClick={(e) => this._getUser(e, 100)} >get random user 1</button>;
		const getUser2 = !profile.loggedIn ? null : <button onClick={(e) => this._getUser(e, 200)} >get random user 2</button>;

		return (
			<div>
				
				{login}
				{getUser1}	
				{getUser2}	

				<ul>
				{api.users && api.users.map((user, i) => (
					<li key={i}>{user.firstName}</li>
				))}		
				</ul>								
				
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
		api: state.api,
	}
};

const mapDispatchToProps = { //shorthand for mapDispatchToProps()
	...profileActions,
	...apiActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
