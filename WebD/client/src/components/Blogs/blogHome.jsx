import React, { useState } from 'react';
import Banner from './banner';
import BlogPosts from './blogposts';
import Modal from './reader';
import { useNavigate } from 'react-router-dom';
import './blogHome.css';

function Bloghome() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); // Holds all posts
  const [selectedPost, setSelectedPost] = useState(null); // Holds the post to display in the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePost = () => {
    navigate('/postPage');
  };

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };



  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleAuthorChange = (e) => {
    setSelectedPost((prevPost) => ({
      ...prevPost,
      author: e.target.value
    }));
  };

  return (
    <div className='bloghome-container'>
      <Banner />
      <div className="create-btn-container">
        <button onClick={handleCreatePost} className="create-btn">Create</button>
      </div>
      <BlogPosts posts={posts} onPostClick={openModal} />

      
      {isModalOpen && (
        <Modal 
          post={selectedPost} 
          onClose={closeModal} 
          onAuthorChange={handleAuthorChange} 
        />
      )}
    </div>
  );
}

export default Bloghome;
