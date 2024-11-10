import React, { useState } from 'react';
import './Postpage.css'


function PostPage() {
  //const [bannerImage, setBannerImage] = useState('../../assets/Ocean.jpg'); // Default banner
  const [title, setTitle] = useState('YOUR TITLE');
  const [content, setContent] = useState('yOUR CONTENT');
  const [username, setUsername] = useState('Guest'); // Default username, you can make it dynamic
  const [date] = useState(new Date().toLocaleDateString());

  /*const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
    }
  };*/

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
