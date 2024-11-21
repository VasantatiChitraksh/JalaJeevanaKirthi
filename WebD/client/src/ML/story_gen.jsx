import React, { useState } from 'react';
import Chat from '../components/chat/chat.jsx';
import './story_gen.css'; // Importing the CSS file
import { GoogleGenerativeAI } from "@google/generative-ai"; //for getting the story, calling gemini api

// Importing icons
import fishIcon from '../assets/fish_icon.png';
import fishermanIcon from '../assets/fisherman_icon.png';
import marineBiologistIcon from '../assets/marine_biologist_icon.png';
import Fishes from '../components/Fish/fish.jsx';

const StoryGen = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [boxHeading, setBoxHeading] = useState('');
  const [storyData, setStoryData] = useState('');
  const [synth, setSynth] = useState(window.speechSynthesis); // SpeechSynthesis instance

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
    const genAI = new GoogleGenerativeAI('AIzaSyBzWwXToAkAlryOgoy_gwihnGQB9b9vVUQ');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a story from the point of view of a ${boxHeading}. The story should describe the day-to-day challenges they face due to overfishing, pollution, climate change, and habitat destruction. Make the story informative, emotional, and educational, helping readers understand the impact of human activity on marine life and the ocean ecosystem. Include details about how these challenges affect the ${boxHeading} and what actions can be taken to improve the situation in 200 words`;

    const result = await model.generateContent(prompt);
    
    const story = result.response.text();
    setStoryData(story);

    const utterance = new SpeechSynthesisUtterance(story);
    synth.speak(utterance);
  };

  const stopAudio = () => {
    if (synth.speaking) {
      synth.cancel(); 
    }
  };

  return (
    <div className={`story-gen ${isBoxVisible ? 'box-open' : ''}`}>
      {/* Top Navigation */}
      <nav className="nav-bar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {isBoxVisible && (
          <div className="side-box">
            <h2>{boxHeading}</h2>
            <p>{storyData}</p>
            <button className="stop-audio" onClick={stopAudio}>Stop Audio</button>
          </div>
          )}
        </ul>
        
      </nav>

      <Fishes />

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
