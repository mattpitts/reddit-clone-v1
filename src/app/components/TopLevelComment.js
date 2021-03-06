import React from 'react';
import {render} from 'react-dom'

import {CommentReply} from './CommentReply';
import {Comment} from './Comment'

export class TopLevelComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showCommentForm: false,
			commentData: this.props.commentData
		}
		this.toggleReplyForm = this.toggleReplyForm.bind(this);
		this.recieveStateFromChild = this.recieveStateFromChild.bind(this);
		this.handleCommentAdd = this.handleCommentAdd.bind(this);
		this.triggerUpvote = this.triggerUpvote.bind(this);
		this.triggerDownvote = this.triggerDownvote.bind(this);
	}

	toggleReplyForm() {
		this.setState({
			showCommentForm: this.state.showCommentForm ? false : true
		})
	}


	handleCommentAdd(newPost) {
		this.setState({
			showCommentForm: false
		})
		let post = {
			title: newPost.title,
			body: newPost.body,
			author: newPost.author,
			url: newPost.url,
			time: Date.now(),
			upvotes: 1,
			downvotes: 0,
			comments: []
		}
		let update = this.props.commentData

		update.comments.push(post);
		// this.state.commentData.comments.push(post);
		this.props.pushStateToParent(this.props.id, update)
	}

	triggerUpvote() {
		let update = this.props.commentData;
		update.upvotes += 1;
		this.props.pushStateToParent(this.props.id, update);
	}

	triggerDownvote() {
		let update = this.props.commentData;
		update.downvotes += 1;
		this.props.pushStateToParent(this.props.id, update);
	}


	recieveStateFromChild(id, commentData) {
		let update = this.props.commentData
		update.comments.map((comment, i) => {
			if(id !== i) {
				return comment;
			} else {
				return commentData;
			}
		})

		this.props.pushStateToParent(this.props.id, update);
	}
	render() {
		return (

				<div className="card top-level-comment-container">
					<div className="card-block">
						<div className="row comment-header">
							<h6 className="card-subtitle mb-2 text-muted">
								<i onClick={this.triggerUpvote}className="fa fa-arrow-circle-up upvote-small"></i> {this.props.commentData.upvotes - this.props.commentData.downvotes} <i onClick={this.triggerDownvote}className="fa fa-arrow-circle-down downvote-small"></i>
								Guest | Created {this.props.commentData.age} |
								<button onClick={this.toggleReplyForm}
									className="card-subtitle mb-2 text-muted comment-button"
									type="button">reply</button>
							</h6>
						</div>
						<h6>{this.props.commentData.body}</h6>
						{this.state.showCommentForm && <CommentReply handleCommentAdd={this.handleCommentAdd}/>}
					</div>
					<div className="comment-children">

						{this.props.commentData.comments &&
							this.props.commentData.comments.map((comment, i) =>
							<Comment
								key={i}
								id={i}
								commentData={comment}
								pushStateToParent={this.recieveStateFromChild}
							/>
						)
						}
					</div>
				</div>

		);
	}
}
