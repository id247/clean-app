import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as apiActions from '../actions/api';

const Users = (props) => (
	<div>
		<button onClick={(e) => props.getUser(e.target, 100)} >get user 100</button>
		<button onClick={(e) => props.getUser(e.target, 200)} >get user 200</button>	

		<ul>
		{props.users && props.users.map((user, i) => (
			<li key={i}>{user.firstName}</li>
		))}		
		</ul>		
	</div>
);

const mapStateToProps = (state, ownProps) => ({
	users: state.api.users,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	getUser: (element, userId) => {
		element.disabled = true;
		dispatch(apiActions.apiGetUser(userId))
		.then( () => { element.disabled = false; })
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
