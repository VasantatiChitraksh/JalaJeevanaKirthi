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
           <div className="list-blogs">
            <BlogPosts />
           </div>
           <div className="create-btn-container">
             <button onClick={handleCreatePost} className="create-btn">Create</button>
           </div>
           
       </div>
       
   );
}

export default Bloghome;

