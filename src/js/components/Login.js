import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../actions/profile';

const Login = (props) => (
	<div>
		{ 
			!props.profile.loggedIn 
			? <button onClick={props.profileActions.profileLogin} disabled={props.profile.inProgress}>Login</button> 
			: <button onClick={props.profileActions.profileLogout}>Logout</button> 
		}
	</div>
);

Login.propTypes = {
	profile: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	profileActions: bindActionCreators(profileActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
