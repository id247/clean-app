import React from 'react';
import { connect } from 'react-redux';

const Loading = ({
	loading
}) => (
	<div style={{float: 'right'}}>{ loading ? 'Loading' : '' }</div>
);

const mapStateToProps = (state, ownProps) => ({
	loading: state.loading,
});

export default connect(mapStateToProps, null)(Loading);
