import React from 'react';

export class PostForm extends React.Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			title: '',
			body: '',
			author: '',
			url: ''
		}
	}

	handleChange(event) {
		let name = event.target.name
		this.setState({
			[name]: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		let post = {
			title: this.state.title,
			body: this.state.body,
			author: this.state.author,
			url: this.state.url,
			time: Date.now(),
			upvotes: 1,
			downvotes: 0,
			rating: 1,
			comments: []
		}
		this.props.submitNewPost(post);
	}


	render() {
		return (
			<div className='container-fluid'>
				<div className='col-sm-12'>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
		    				<label htmlFor="new-post-title">Title</label>
		    				<input name="title"type="text" onChange={this.handleChange} value={this.state.title} className="form-control" id="new-post-title"></input>
		  				</div>
						<div className="form-group">
		    				<label htmlFor="new-post-body">Body</label>
		    				<textarea name="body"className="form-control" onChange={this.handleChange} value={this.state.body} id="new-post-body" rows="3"></textarea>
		  				</div>
						<div className="form-group">
		    				<label htmlFor="new-post-author">Author</label>
		    				<input name="author"type="text" onChange={this.handleChange} value={this.state.author} className="form-control" id="new-post-author"></input>
		  				</div>
						<div className="form-group">
		    				<label htmlFor="new-post-url">Image URL</label>
		    				<input name="url"type="text" onChange={this.handleChange} value={this.state.url} className="form-control" id="new-post-url"></input>
		  				</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		);
	}
}
