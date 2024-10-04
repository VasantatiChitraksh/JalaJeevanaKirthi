import React from 'react';
import './story_gen.css'; // Importing the CSS file

const StoryGen = () => {
  return (
    <div className="story-gen">
      {/* Top Navigation */}
      <nav className="nav-bar">
        <ul>
          <li>
            <a href="https://example.com/home" target="_blank" rel="noopener noreferrer">Home</a>
          </li>
          <li>
            <a href="https://example.com/blogs" target="_blank" rel="noopener noreferrer">Blogs</a>
          </li>
          <li className="right">
            <a href="https://example.com/login" target="_blank" rel="noopener noreferrer">Login</a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        {/* List of Options */}
        <div className="option-list">
          <a href="https://example.com/fish" target="_blank" rel="noopener noreferrer">
            <div className="option">
              <div className="circle"></div>
              <span>Fish</span>
            </div>
          </a>

          <a href="https://example.com/fisherman" target="_blank" rel="noopener noreferrer">
            <div className="option">
              <div className="circle"></div>
              <span>Fisherman</span>
            </div>
          </a>

          <a href="https://example.com/marine-biologist" target="_blank" rel="noopener noreferrer">
            <div className="option">
              <div className="circle"></div>
              <span>Marine Biologist</span>
            </div>
          </a>
        </div>
      </div>

      {/* Chat Bot Button */}
      <a href="https://example.com/chat-bot" target="_blank" rel="noopener noreferrer">
        <button className="chat-bot">Chat Bot</button>
      </a>
    </div>
  );
}

export default StoryGen;
