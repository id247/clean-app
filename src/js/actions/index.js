import fetch from 'isomorphic-fetch';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export function increment(){
	return{
		type: INCREMENT
	};
};

export function decrement(){
	return{
		type: DECREMENT
	};
};


export const FETCHING_ENABLE = 'FETCHING_ENABLE';
export const FETCHING_DISABLE = 'FETCHING_DISABLE';

export function fetchingON(){
	return{
		type: FETCHING_ENABLE
	};
};

export function fetchingOff(){
	return{
		type: FETCHING_DISABLE
	};
};


export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function requestPosts(subreddit) {
	return {
		type: REQUEST_POSTS,
		subreddit
	}
}

export function receivePosts(subreddit, json) {
	return {
		type: RECEIVE_POSTS,
		subreddit,
		posts: json.data.children.map(child => child.data),
		receivedAt: Date.now()
  	}
}

export function fetchPosts(subreddit) {
  	return dispatch => {
  		dispatch(fetchingON());
		dispatch(requestPosts(subreddit));
		return fetch(`http://www.reddit.com/r/${subreddit}.json`)
	  		.then(response => response.json())
	  		.then(json => {
	  			dispatch(fetchingOff());
	  			dispatch(receivePosts(subreddit, json))
	  		})
  	}
}
