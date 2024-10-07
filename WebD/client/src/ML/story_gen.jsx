import React, { useState } from 'react';
import './story_gen.css'; // Importing the CSS file

const StoryGen = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [boxHeading, setBoxHeading] = useState(''); // State to manage the heading of the box

  // Function to handle when any button is clicked
  const handleButtonClick = (heading) => {
    try {
      setIsBoxVisible(true); // Set the state to show the box
      setBoxHeading(heading); // Update the heading based on the clicked button
    } catch (error) {
      console.error('Error while handling button click:', error);
    }
  };

  return (
    <div className={`story-gen ${isBoxVisible ? 'box-open' : ''}`}>
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
        <div className="option-list">
          <div className="option" onClick={() => handleButtonClick('Fish')}>
            <div className="circle"></div>
            <span>Fish</span>
          </div>

          <div className="option" onClick={() => handleButtonClick('Fisherman')}>
            <div className="circle"></div>
            <span>Fisherman</span>
          </div>

          <div className="option" onClick={() => handleButtonClick('Marine Biologist')}>
            <div className="circle"></div>
            <span>Marine Biologist</span>
          </div>
        </div>
      </div>

      {/* Right Box with Heading */}
      {isBoxVisible && (
        <div className="side-box">
          <h2>{boxHeading}</h2>
        </div>
      )}

      {/* Chat Bot Button */}
      <a href="https://example.com/chat-bot" target="_blank" rel="noopener noreferrer">
        <button className="chat-bot">Chat Bot</button>
      </a>
    </div>
  );
}

export default StoryGen;
