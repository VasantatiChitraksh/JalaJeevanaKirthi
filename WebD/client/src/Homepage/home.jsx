import React from 'react';
import './style.css';

function Home() {
  return (
    <body>
        <div className="about-section">
            <h2>About Us</h2>
            <p>We have started to to do this to save the marine life and stuff</p>
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
        </div>
        <footer className="footer-section">
            <p>@ 2024 Your Company.All rights reseved</p>
        </footer>
    </body>
  );
}

export default Home;
