import React from 'react';

import {TopLevelCommentForm} from './TopLevelCommentForm';
import {Comment} from './Comment';
import {TopLevelComment} from './TopLevelComment';

export const CommentContainer = (props) => {
	return (
		<div className="comment-section-container">

					<TopLevelCommentForm handleCommentChange={props.handleCommentChange}></TopLevelCommentForm>
					{props.comments.length >= 1 &&
						props.comments.map((comment, i) =>
							<TopLevelComment
								key={i}
								id={i}
								commentData={comment}
								pushStateToParent={props.pushStateToParent}
							/>
						)
					}

		</div>
	)
}
