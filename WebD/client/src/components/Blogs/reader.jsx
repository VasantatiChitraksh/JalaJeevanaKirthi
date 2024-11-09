import React, { useState } from 'react';
import './reader.css'

function PostPage() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);

  const handleCommentButtonClick = () => {
    setIsCommenting(true);
  };

  const handleCommentPost = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
    setIsCommenting(false);
  };

  return (
    <div className="post-page">
      <h1 className="post-title">Post Title</h1>
      <p className="post-content">
        This is the content of the post. It contains detailed information and explanations.
      </p>

      <div className="comment-section">
        <h3>Comments</h3>
        {comments.map((comment, index) => (
          <p key={index} className="comment">{comment}</p>
        ))}
        {isCommenting ? (
          <>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className="comment-input"
            />
            <button onClick={handleCommentPost} className="post-btn">Post</button>
          </>
        ) : (
          <button onClick={handleCommentButtonClick} className="comment-btn">Comment</button>
        )}
      </div>
    </div>
  );
}

export default PostPage;
