import React from 'react';
import Banner from './banner';
import BlogPosts from './blogposts';
import { useNavigate } from 'react-router-dom';
import './blogHome.css';

function Bloghome() {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/postPage');
  };

   return (
       <div className='bloghome-container'>
           <Banner />
           <button onClick={handleCreatePost} className="create-btn">Create</button>
           <BlogPosts />
           
       </div>
       
   );
}

export default Bloghome;

