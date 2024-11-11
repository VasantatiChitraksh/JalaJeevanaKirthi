import React from 'react';
import { useNavigate } from 'react-router-dom';
import './blogHome.css';

function BlogPosts({ onPostClick }) {
    const navigate = useNavigate();

    const handlePostClick = (id) => {
      navigate(`/post/${id}`);
    };
  

  return (
    <section className="blog-section">
      <div className="blog-grid">
       
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="blog-post"  onClick={() => onPostClick(index + 1)}>
            Post {index + 1}
          </div>
        ))}
      </div>
      
    </section>
  );
}

export default BlogPosts;

