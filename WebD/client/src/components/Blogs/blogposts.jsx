import React from 'react';
import './blogHome.css';

function BlogPosts({ posts, onPostClick }) {
  if (!posts.length) {
    return <p className="no-posts-message">No posts available. Create one!</p>;
  }

  return (
    <section className="blog-section">
      <div className="blog-grid">
        {posts.map((post, index) => (
          <div
            key={index}
            className="blog-post"
            onClick={() => onPostClick(post)}
          >
            <h2>{post.title}</h2>
            <p>{post.username}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogPosts;
