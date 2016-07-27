import React from 'react';

const Loading = (props) => (
	<div style={{float: 'right'}}>{ props.loading ? 'Loading' : '' }</div>
);

Loading.propTypes = {
	loading: React.PropTypes.bool.isRequired,
};	

export default Loading;
