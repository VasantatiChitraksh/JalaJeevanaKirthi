import React from 'react';
import './Modal.css';

function Modal({ post, onClose, onAuthorChange }) {
  if (!post) return null; // Return null if there's no post to display
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h1>{post.title}</h1>
        <p><strong>Author:</strong> 
          <input 
            type="text" 
            value={post.author} 
            onChange={onAuthorChange} 
            className="author-input" 
          />
        </p>
        <p><strong>Date:</strong> {post.date}</p>
        <div className="post-details">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;

