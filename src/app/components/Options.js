import React from 'react';
import { render } from 'react-dom';

export class Options extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);

		this.state = {
			sortOption: 'rating'
		}
	}


	handleChange(event) {
		this.props.updateSortState(event.target.value);
	}

	handleFilterChange(event) {
		this.props.updateFilterState(event.target.value)
	}

	render() {
		return (
			<div className="container">
				<div className="row options-bar">
					<div className="col-sm-11 options-bar-left">
						<form>
							<input id="searchBox" placeholder="Filter" onChange={this.handleFilterChange}></input>
						</form>
						<select onChange={this.handleChange}>
							<option value='rating'>Sort by rating</option>
							<option value='age'>Sort by most recent</option>
							<option value='replyCount'>Sort by replies</option>
						</select>
					</div>
					<div className="col-sm-1">
						<button onClick={this.props.showPost} type="button" className="btn btn-primary btn-sm">New Post</button>
					</div>
				</div>
			</div>
		);
	}
}
