import React, { useState } from 'react';
import Chat from '../components/chat/chat.jsx';
import './story_gen.css'; // Importing the CSS file

// Importing icons
import fishIcon from '../assets/fish_icon.png';
import fishermanIcon from '../assets/fisherman_icon.png';
import marineBiologistIcon from '../assets/marine_biologist_icon.png';

const StoryGen = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [boxHeading, setBoxHeading] = useState('');
  const [storyData, setStoryData] = useState('');

  const handleButtonClick = (heading) => {
    try {
      setIsBoxVisible(true);
      setBoxHeading(heading);
      getStoryData();
    } catch (error) {
      console.error('Error while handling button click:', error);
    }
  };

  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const getStoryData = async () => {
    // Placeholder for AI-generated story retrieval
    const prompt = `Write a story from the point of view of a ${boxHeading}.`;
    const story = `This is a sample story about a ${boxHeading}.`;
    setStoryData(story);

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(story);
    synth.speak(utterance);
  };

  return (
    <div className={`story-gen ${isBoxVisible ? 'box-open' : ''}`}>
      {/* Top Navigation */}
      <nav className="nav-bar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="https://example.com/blogs">Blogs</a>
          </li>
          <li className="right">
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        <div className="option-list">
          <div className="option" onClick={() => handleButtonClick('Fish')}>
            <div className="circle">
              <img src={fishIcon} alt="Fish Icon" />
            </div>
            <span>Fish</span>
          </div>

          <div className="option" onClick={() => handleButtonClick('Fisherman')}>
            <div className="circle">
              <img src={fishermanIcon} alt="Fisherman Icon" />
            </div>
            <span>Fisherman</span>
          </div>

          <div className="option" onClick={() => handleButtonClick('Marine Biologist')}>
            <div className="circle">
              <img src={marineBiologistIcon} alt="Marine Biologist Icon" />
            </div>
            <span>Marine Biologist</span>
          </div>
        </div>
      </div>

      {/* Right Box with Heading */}
      {isBoxVisible && (
        <div className="side-box">
          <h2>{boxHeading}</h2>
          <p>{storyData}</p>
        </div>
      )}

      {/* Chat Bot Button */}
      <div className="chat">
        <button className="chatbot" onClick={toggleChat}>
          ChatBot
        </button>
        {isChatOpen && <Chat toggleChat={toggleChat} />}
      </div>
    </div>
  );
};

export default StoryGen;
