import React from 'react';
import {render} from 'react-dom';
import {CommentContainer} from './CommentContainer';

export class Post extends React.Component {
	constructor(props) {
		super();
		this.state = {
			showComments: false
		}
		this.toggleComments = this.toggleComments.bind(this);
		this.handleCommentChange = this.handleCommentChange.bind(this);
		this.recieveStateFromChild = this.recieveStateFromChild.bind(this)
		this.triggerUpvote = this.triggerUpvote.bind(this);
		this.triggerDownvote = this.triggerDownvote.bind(this);
	}


	toggleComments() {
		this.setState({
			showComments: this.state.showComments ? false : true
		})
	}

	triggerUpvote() {
		let update = this.props.postData;
		update.upvotes += 1;
		this.props.updateCommentState(this.props.id, update)
	}

	triggerDownvote() {
		let update = this.props.postData;
		update.downvotes += 1;
		this.props.updateCommentState(this.props.id, update)
	}

	handleCommentChange(state) {
		// this.state.comments.push(state)
		let update = this.props.postData;
		update.comments.push(state)
		this.props.updateCommentState(this.props.id, update)
	}

	recieveStateFromChild(id, commentData) {
		let update = this.props.postData;
		update.comments.map((comment, i) => {
			if(id !== i) {
				return comment;
			} else {
				return commentData;
			}
		})
		this.props.updateCommentState(this.props.id, update)
	}

	render() {
		let commentText = 'Comment'
		if(this.props.postData.replyCount === 1) {
			commentText='1 Comment';
		} else if(this.props.postData.replyCount > 1) {
			commentText=`${this.props.postData.replyCount} comments`
		}

		return (
			<div className="card">
				<div className="card-block bg-faded">
					<div className="row">
						<div className="col-sm-3">
							<img src={this.props.postData.url}></img>
						</div>
						<div className="col-sm-9">
							<div className="row">
								<div className="col-sm-12">
									<h4 className="card-title">{this.props.postData.title}</h4>
									<h6 className="card-subtitle mb-2 text-muted">
									<i onClick={this.triggerUpvote}className="fa fa-arrow-circle-up upvote-small"></i>
									{this.props.postData.upvotes - this.props.postData.downvotes}
									<i onClick={this.triggerDownvote}className="fa fa-arrow-circle-down downvote-small"></i>
									Created {this.props.postData.age} by {this.props.postData.author} |
									<button onClick={this.toggleComments} className="card-subtitle mb-2 text-muted comment-button" type="button">{commentText}</button></h6>
									<p className="card-text post-body">{this.props.postData.body}</p>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12">

								</div>
							</div>

						</div>
					</div>
					{this.state.showComments &&
						<CommentContainer
							comments={this.props.postData.comments}
							pushStateToParent={this.recieveStateFromChild}
							handleCommentChange={this.handleCommentChange}
						/>
					}
				</div>
			</div>
		)
	}
}
