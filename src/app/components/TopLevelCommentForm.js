import React from 'react';
import {render} from 'react-dom';

export class TopLevelCommentForm extends React.Component {
	constructor(props) {
		super();
		this.state = {
			body: "",
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		this.props.handleCommentChange(post);
		this.setState({
			body: ''
		})
	}


	render() {
		return (
			<div className="row top-level-comment-form-container">
				<div className="col-sm-12">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="new-top-level-comment-body">Add a comment</label>
							<textarea required name="body"className="form-control" onChange={this.handleChange} value={this.state.body} id="new-top-level-comment-body" rows="3"></textarea>
						</div>
						<button type="submit" className="btn btn-primary btn-sm">Submit</button>
					</form>
				</div>
			</div>

		);
	}
}
