import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from '../components/Login';
import Users from '../components/Users';
import Loading from '../components/Loading';

class App extends React.Component {


	render() {	
		const { props } = this;

		const users = props.profile.loggedIn ? <Users /> : null ;

		return (
			<div>				
				<Login 
					profile={props.profile}
				/>
				{users}
				<Loading 
					loading={props.loading}
				/>
			</div>
		);
	}

};

App.propTypes = {

};

const mapStateToProps = (state, ownProps) => ({
	profile: state.profile,
	loading: state.loading,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
