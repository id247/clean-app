import React from 'react';
import { connect } from 'react-redux';

let Loading = React.createClass({

	render: function() {
		return (
			<div style={{float: 'right'}}>{ this.props.loading 
					? 'Loading'
					: '' }
			</div>
		);
	}

});

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.loading,
	}
};


Loading = connect(
	mapStateToProps,
)(Loading);

export default Loading;
