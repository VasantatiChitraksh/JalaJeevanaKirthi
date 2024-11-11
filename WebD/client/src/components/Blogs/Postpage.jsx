import React, { useState } from 'react';
import './Postpage.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function PostPage() {

  const [title, setTitle] = useState('YOUR TITLE');
  const [content, setContent] = useState('yOUR CONTENT');
  const [username, setUsername] = useState('Guest'); // Default username, you can make it dynamic
  const [date] = useState(new Date().toLocaleDateString());
  const navigate = useNavigate();
  const location = useLocation();
  const addPost = location.state?.addPost;


  const validateTitle = () => {
    const wordsInTitle = title.trim().split(' ');
    return wordsInTitle.length >= 1 && title.toLowerCase() !== 'your title';
  };

  const validateContent = () => {
    const wordsInContent = content.trim().split(' ');
    return wordsInContent.length >= 20 && content.toLowerCase() !== 'your content';
  };

  const handleSubmit = () => {
    if (!validateTitle()) {
      alert("Please enter a title with at least 1 word and not 'YOUR TITLE'");
      return;
    }
    if (!validateContent()) {
      alert("Please enter content with at least 20 words and not 'YOUR CONTENT'");
      return;
    }

    alert('Your post submitted successfully');

    // If validations pass, create the new post and navigate back to homepage
    const newPost = { title, content, username, date };
    addPost(newPost);
    navigate('/');
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
