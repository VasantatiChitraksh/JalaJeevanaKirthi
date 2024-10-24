import React, { useState } from 'react';
import Chat from '../components/chat/chat.jsx';
import './story_gen.css'; // Importing the CSS file
import { GoogleGenerativeAI } from "@google/generative-ai"; //for getting the story, calling gemini api

const StoryGen = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [boxHeading, setBoxHeading] = useState('');
  const [storyData, setStoryData] = useState('')

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
    setIsChatOpen(prevState => !prevState);
 };
 
  const getStoryData = async () => {
    const genAI = new GoogleGenerativeAI('AIzaSyB060WZBPz_EswunsAdpVwQxRAI4-5wf_4');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a story from the point of view of a ${boxHeading}. The story shod describe the day-to-day challenges they face due to overfishing, pollution, climate change, and habitat destruction. Make the story informative, emotional, and educational, helping readers understand the impact of human activity on marine life and the ocean ecosystem. Include details about how these challenges affect the ${boxHeading} and what actions can be taken to improve the situation in 300 words`;

    const result = await model.generateContent(prompt);
    
    const story = result.response.text();
    setStoryData(story);

  }

  return (
    <div className={`story-gen ${isBoxVisible ? 'box-open' : ''}`}>
      {/* Top Navigation */}
      <nav className="nav-bar">
        <ul>
          <li>
            <a href="/" >Home</a>
          </li>
          <li>
            <a href="https://example.com/blogs" >Blogs</a>
          </li>
          <li className="right">
            <a href="/login" >Login</a>
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
          <p>{storyData}</p>
        </div>
      )}

      {/* Chat Bot Button */}
      <div className='chat'>
          <button className="chatbot" onClick={toggleChat}>
            ChatBot
          </button>
          {isChatOpen && <Chat toggleChat={toggleChat} />}
      </div>
    </div>
  );
}

export default StoryGen;
