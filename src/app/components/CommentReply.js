import React from 'react';
import {render} from 'react-dom';


export class CommentReply extends React.Component {
	constructor(props) {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			body: ''
		}
	}
	handleChange(event) {
		this.setState({
			body: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		let post = {
			body: this.state.body,
			time: Date.now(),
			age: 'just now',
			upvotes: 1,
			downvotes: 0,
			comments: []
		}
		this.props.handleCommentAdd(post);
		this.setState({
			body: ''
		})
	}
	render() {
		return (
			<div className="row">
				<div className="col-sm-12">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
		    				<label htmlFor="new-reply-body"></label>
		    				<textarea name="body"className="form-control" onChange={this.handleChange} value={this.state.body} id="new-reply-body" rows="3"></textarea>
		  				</div>
						<button type="submit" className="btn btn-primary btn-sm">Submit</button>
					</form>
				</div>
			</div>
		)
	}
}
