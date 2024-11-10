import React, { useState } from 'react';
import './Postpage.css'


function PostPage() {

  const [title, setTitle] = useState('YOUR TITLE');
  const [content, setContent] = useState('yOUR CONTENT');
  const [username, setUsername] = useState('Guest'); // Default username, you can make it dynamic
  const [date] = useState(new Date().toLocaleDateString());



  const handleSubmit = () => {
    
    alert('Post submitted successfully!');
  };

  return (
    <div className="post-page">

      <input 
        type="text" 
        placeholder="Enter Post Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="title-input"
      />
      <div className="post-meta">
        <p><strong>Author:</strong> {username}</p>
        <p><strong>Date:</strong> {date}</p>
      </div>
      <textarea 
        placeholder="Write your content here..." 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        className="content-input"
      />
      <button onClick={handleSubmit} className="submit-btn">Submit</button>
    </div>
  );
}

export default PostPage;
