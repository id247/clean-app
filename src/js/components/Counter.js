import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement, fetchPosts } from '../actions';

const mapStateToProps = (state, ownProps) => {
	console.log(state);
	return {
		counter: state.counter,
		posts: state.posts,
		fetching: state.fetching,
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onIncrementClick: () => {
			dispatch(
				increment()
			)
		},
		onDecrementClick: () => {
			dispatch(
				decrement()
			)
		},
		onFetchClick: () => {
			dispatch(
				fetchPosts('reactjs')
			)
		},
	}
};

let Counter = React.createClass({
	render() {
		return (
			<p>
				Clicked: {this.props.counter} times
				{' '}
				<button onClick={this.props.onIncrementClick}>
					+
				</button>
				{' '}
				<button onClick={this.props.onDecrementClick}>
					-
				</button>
				<button onClick={this.props.onFetchClick}>
					fetch
				</button>
				{(this.props.fetching ? 'Тащим': '')}
			</p>
		)
	}
});

Counter = connect(
	mapStateToProps,
	mapDispatchToProps
)(Counter);

export default Counter
