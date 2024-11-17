import React, { useState, useEffect } from 'react';
import './Postpage.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function PostPage() {

  const [title, setTitle] = useState('Title');
  const [content, setContent] = useState('Content');
  const [username, setUsername] = useState('Guest'); // Default username, you can make it dynamic

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (email) {
          const userResponse = await axios.get(`https://ug2-team3-se-webd-1.onrender.com/auth/user?email=${email}`);
          setUsername(userResponse.data.username);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEmail();
  }, []);


  const validateTitle = () => {
    const wordsInTitle = title.trim().split(' ');
    return wordsInTitle.length >= 1 && title.toLowerCase() !== 'your title';
  };

  const validateContent = () => {
    const wordsInContent = content.trim().split(' ');
    return wordsInContent.length >= 10 && content.toLowerCase() !== 'your content';
  };

  const handleSubmit = async () => {
    if (!validateTitle()) {
      alert("Please enter a title with at least 1 word and not 'YOUR TITLE'");
      return;
    }
    if (!validateContent()) {
      alert("Please enter content with at least 10 words and not 'YOUR CONTENT'");
      return;
    }

    alert('Your post submitted successfully');

    // If validations pass, create the new post and navigate back to homepage
    const newPost = { username, title, content };

    const response = await axios.post('https://ug2-team3-se-webd-1.onrender.com/blogs/newblog', {
      username,
      title,
      content,
    });
    
    // addPost(newPost);
    navigate('/blogs');
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
        {/* <p><strong>Date:</strong> {date}</p> */}
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
