import React from 'react';
import { connect } from 'react-redux';

const Loading = (props) => (
	<div style={{float: 'right'}}>{ props.loading ? 'Loading' : '' }</div>
);

const mapStateToProps = (state, ownProps) => ({
	loading: state.loading,
});

export default connect(mapStateToProps, null)(Loading);
