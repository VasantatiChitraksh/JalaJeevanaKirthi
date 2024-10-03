import React, { useState, useEffect } from 'react';
import './style.css';
import './script'

function Home() {
  return (
    <body className='background'>
        <div className='waves'>

        </div>
        <div className="about-section">
            <h2>About Us</h2>
            <p>We have started to to do this to save the marine life and stuff</p>
        </div>
        <div className='fishes'>

        </div>
        <div className="icons-section">
            <div className="icon-box">
                <p>Icon 1</p>
            </div>
            <div className="icon-box">
                <p>Icon 2</p>
            </div>
            <div className="icon-box">
                <p>Icon 3</p>
            </div>
        <div className='scuba'>

        </div>
        </div>
        <div className='sub'>

        </div>
        <div className='whale'>

        </div>
        <footer className="footer-section">
            <p>@ 2024 Your Company.All rights reseved</p>
        </footer>
        <script src="script.js"></script>
    </body>
  );
}

export default Home;
