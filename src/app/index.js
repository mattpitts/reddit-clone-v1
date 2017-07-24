import React from 'react';
import {render} from 'react-dom';

import {Header} from './components/Header';
import {Options} from './components/Options';
import {PostForm} from './components/PostForm';
import {Post} from './components/Post';
import {seeds} from './seeds';


export class App extends React.Component {
	constructor() {
		super();
		this.togglePostForm = this.togglePostForm.bind(this);
		this.submitPost = this.submitPost.bind(this);
		this.updateCommentState = this.updateCommentState.bind(this);
		this.updateSortState = this.updateSortState.bind(this);
		this.updateFilterState = this.updateFilterState.bind(this);
		seeds.forEach(post => {
			post.replyCount = getPostChildren(post);
			updatePostRating(post);
		})

		this.state = {
			hidePostForm: true,
			sortBy: 'rating',
			posts: updatePostAges(seeds)
		}
		setInterval(() => {
			this.setState({
				posts: updatePostAges(this.state.posts)
			})
		}, 7000);

	}

	togglePostForm() {
		this.setState({
			hidePostForm: this.state.hidePostForm ? false : true
		});
	}

	submitPost(post) {
		post.age = getPostAge(post.time);
		this.state.posts.push(post)
		this.setState({
			hidePostForm: true
		});
	}


	updateCommentState(postId, updatedPost) {
		updatePostRating(updatedPost);
		sortPostChildren(updatedPost);
		let updatedPosts = this.state.posts.map((post, i) => {
			if(i !== postId) {
				return post
			} else {
				updatedPost.replyCount = getPostChildren(updatedPost);
				return updatedPost;
			}
		});
		updatedPosts = sortPostsByKey(updatedPosts, this.state.sortBy)
		this.setState({
			posts: updatedPosts
		})
	}


	updateSortState(key) {
		this.setState({
			sortBy: key,
			posts: sortPostsByKey(this.state.posts, key)
		});
	}

	updateFilterState(filter) {
		this.setState({
			posts: this.state.posts.map(post => {
				if(post.title.toLowerCase().indexOf(filter.toLowerCase()) == -1) {
					post.filtered = true;
				} else {
					post.filtered = false;
				}
				return post;
			})
		});
	}

	render() {
		let filteredPosts = [];
		this.state.posts.forEach(post => {
			if(!post.filtered) {
				filteredPosts.push(post)
			}
		});
		return (
			<div>
				<Header/>
				<Options showPost={this.togglePostForm} updateSortState={this.updateSortState} updateFilterState={this.updateFilterState}/>
				{!this.state.hidePostForm && <PostForm submitNewPost={this.submitPost}/>}
				<div className="container">
					{filteredPosts.map((post, i) =>
							<Post
								key={i}
								id={i}
								postData={post}
								updateCommentState={this.updateCommentState}
							/>
						)
					}
				</div>
			</div>
		)
	}
}

function getPostAge(time) {
	let ageInMinutes = ((Date.now() - time) / 1000) / 60;
	if(ageInMinutes < .1) {
		return "just now";
	} else if (ageInMinutes < 1) {
		return "less than a minute ago";
	} else if (ageInMinutes < 2) {
		return "a minute ago";
	} else if (ageInMinutes < 60) {
		return `${Math.floor(ageInMinutes)} minutes ago`;
	} else if (ageInMinutes >= 60) {
		let ageInHours = Math.floor(ageInMinutes / 60);
		if(ageInHours < 2) {
			return `${ageInHours} hour ago`;
		} else if (ageInHours < 24) {
			return `${ageInHours} hours ago`;
		} else {
			let ageInDays = Math.floor(ageInHours / 24);
			return ageInDays < 2 ? `${ageInDays} day ago` : `${ageInDays} days ago`;
		}
	}
}


function sortPostsByKey(posts, key) {
	let sortedArray = posts.slice();

	sortedArray.sort((a,b) => {
		return b[key]-a[key];
	})
	return sortedArray;
}


function getPostChildren(post) {
	let children = 0;
	function getCommentChildren(comments) {
		children+=comments.length
		comments.forEach(comment => {
			getCommentChildren(comment.comments);
		})
	}
	getCommentChildren(post.comments);
	return children;
}


function updatePostAges(posts) {
	return posts.map(post => {
		post.age = getPostAge(post.time);
		if(post.comments) {
			post.comments = updatePostAges(post.comments);
		}
		return post;
	})
}


function sortPostChildren(post) {
	function sortComments(comment) {
		if(comment.comments) {
			comment.comments.sort((a,b) => {
				return b.rating - a.rating;
			});
			comment.comments.forEach(child => {
				sortComments(child);
			});
		}
	}
	return sortComments(post)
}

function updatePostRating(post) {
	post.rating = post.upvotes - post.downvotes;
	if(post.comments) {
		post.comments.forEach(comment => {
			updateCommentRating(comment);
		});
	}
	function updateCommentRating(comment) {
		comment.rating = comment.upvotes - comment.downvotes;
		if(comment.comments) {
			comment.comments.forEach(comment => {
				updateCommentRating(comment)
			});
		}
	}
}

render(<App />, window.document.getElementById('app'));
