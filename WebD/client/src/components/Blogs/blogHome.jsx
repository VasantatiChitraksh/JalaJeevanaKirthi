import React from 'react';
import Banner from './banner';
import BlogPosts from './blogposts';
import { useNavigate } from 'react-router-dom';

function Bloghome() {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/create-post');
  };

   return (
       <div>
           <Banner />
           <BlogPosts />
           <button onClick={handleCreatePost} className="create-btn">Create</button>
       </div>
       
   );
}

export default Bloghome;

