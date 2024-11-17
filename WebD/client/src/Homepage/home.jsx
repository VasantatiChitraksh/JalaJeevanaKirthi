import React, { useState, useEffect } from 'react';
import './style.css';
import logo from '../assets/LOGO.jpg';
import fish from '../assets/fish.png';
import { Link,Navigate,useNavigate } from "react-router-dom";
import coral from '../assets/Coral.png';
import whale from '../assets/whale.png';
import scuba from '../assets/scuba.png';
import sub from '../assets/submarine.png';
import card from '../assets/design1.png';
import Chat from '../components/chat/chat.jsx';
import {FaComment} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';
import Axios from "axios";
import coralImg from '../assets/Coral_Image.jpg';
import marine from '../assets/MarineBiodiveristy.jpg'
import ocean from '../assets/Proj_Image1.jpg'
import './style.css';
import { Fish } from '../../../server/models/MarineData.js';
import Fishes from '../components/Fish/fish.jsx';

function Home() {
    const images = [
        coralImg,
        marine,
        ocean,
    ]

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [username, setUsername] = useState("");
    var loginFlag= 0;
    loginFlag = localStorage.getItem('loginFlag')

    const toggleChat = () => {
      setIsChatOpen(prevState => !prevState);
   };
    const headings = [
        'Coral reefs conservation',
        'Marine biodiveristy',
        'Saving Our Oceans'
    ]

    const paragraph = [
        'They are a vital part of our ecosystem but they are threatened by climate change,pollution and various other reasons.Protecting these are necessary for maintaining biodiversity and even essential for our survival',
        'Oceans play a vital role in regulating temperature of Earth by absorbing carbon-di-oxide and heat.This natural process helps mitigate climate change impacts. Understanding and protecting this function is crucial for maintaining global climate stability.',
        'Our oceans cover over 70% of the Earth’s surface and are essential for regulating climate and supporting diverse ecosystems. However, they face threats from pollution, overfishing, and climate change. By reducing plastic use and supporting sustainable practices, we can help protect these vital resources. Together, we can ensure our oceans remain healthy for future generations.'
    ]
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleRightClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollFraction = Math.min(scrollTop / maxScroll, 1);

            const startColor = [38, 174, 232]; 
            const endColor = [10, 25, 74]; 

            const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * scrollFraction);
            const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * scrollFraction);
            const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * scrollFraction);

            document.querySelector('.background').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        };

        const email = localStorage.getItem('userEmail');
        console.log("Email from localStorage:", email);
        
        if (email) {
            Axios.get(`https://ug2-team3-se-webd-1.onrender.com/auth/user?email=${email}`)
              .then((response) => {
                console.log("Response data:", response.data); // Log the response to check the structure
                setUsername(response.data.username); // Update the username in state
              })
              .catch((error) => {
                console.error("Error fetching user data:", error);
              });
        }

        document.addEventListener('scroll', handleScroll);
        
        return () => {
            document.removeEventListener('scroll', handleScroll); 
        };
    }, []);


    useEffect(() => {
        console.log("Updated username:", username); // Logs the username after it's updated
    }, [username]);

    


    useEffect(() => {
        const handleFooterScroll = () => {
            const footer = document.querySelector('footer');
            const footerPosition = footer.getBoundingClientRect();
            if (footerPosition.top < window.innerHeight) {
                document.querySelector('.whale').style.display = 'block';
            } else {
                document.querySelector('.whale').style.display = 'none';
            }

            
        };

        window.addEventListener('scroll', handleFooterScroll);


        return () => {
            window.removeEventListener('scroll', handleFooterScroll); 
        };
    }, []);
    const navigate = useNavigate();
    const handleOnclick2 = (e) => {
            navigate('/roleplay')
         }
    const handleOnclick3 = (e) => {
            navigate('/weather')
         }
    const handleOnclick4 = (e) => {
        navigate('/game')
    }
    const handleOnclick5 = (e) => {
        if (loginFlag === "1") {
            navigate('/forums' , { state: { username } })
          } else {
            alert("Please Login to access Forums....😅")
          }
        
    }
    const handleOnclick6 = (e) =>{
        if (loginFlag === "1") {
            navigate('/datasets')
          } else {
            alert("Please Login to access Datasets....😅")
          }
        
    }
    const handleOnclick7 = (e) => {
        if (loginFlag === "1") {
            navigate('/blogs')
          } else {
            alert("Please Login to access Blogs....😅")
          }
       
    }

    const handleLoginLogout = (e) => {
        if (loginFlag === "1") {
            localStorage.removeItem('loginFlag');
            localStorage.removeItem('userEmail');
            setUsername("");
            loginFlag = "0";
            navigate('/'); 
        } else {
            navigate('/login');
        }
    }
    const handleOnclick8 = (e) => {
        if (loginFlag === "1"){
        alert(`Hey!! ${username} Welcome to JalaJeevanaKirthi`)
        }
        else{
            alert("Please Create/Login into Your Account to access all our features")
        }
    }

    const handleOnclick9 = (e) => {
        navigate('/quiz')
    }

    return (
        <div className='background'>
            <div className="topbar">
                <img className="logo-icon" src={logo} alt="Logo" />
                <h2 className="logo">JalaJeevanaKeerthi</h2>
                <button className="topbar-button" onClick={handleOnclick4}>Game🎮</button>
                <button className="topbar-button" onClick={handleOnclick3}>Weather☁️</button>
                <button className="topbar-button" onClick={handleOnclick7}>Blogs🤩</button>
                <button className="topbar-button" onClick={handleOnclick2}>RolePlay🎭</button>
                <button className="topbar-button" onClick={handleOnclick6}>Datasets📑</button>
                <button className="topbar-button" onClick={handleOnclick5}>Forums🗨️</button>
                <button className="topbar-button" onClick={handleOnclick9}>Quiz</button>
                <button className="topbar-button" onClick={handleLoginLogout}>
                    {loginFlag === "1" ? "Logout🏃‍♂️‍➡️" : "Login🏃‍♂️"}
                </button>
                <button className="topbar-button"  onClick={handleOnclick8}>👤 {username}</button>
            </div>
            <div className="spacer"></div>
            <div className='waves'></div>
            <div className="image-holder-whole">
            <button className="nav-button" onClick={handleLeftClick}>&lt;</button>
            <div 
        className="image-holder" 
        style={{ 
            backgroundImage: `url(${images[currentIndex]})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
        }}
    >
        <div className="text">
            <h1>{headings[currentIndex]}</h1>
            <p>{paragraph[currentIndex]}</p>
        </div>
    </div>
    <button className="nav-button" onClick={handleRightClick}>&gt;</button>
    
</div>

            <div className="spacer">

            </div>
            <div className='fishes'>
                <img className="fish-icon" src={fish} alt="Fish" />
                <img className="fish-icon" src={fish} alt="Fish" />
            </div>
            <div className="about-section">
                <h2>About Us</h2>
                <p>At Jala Jeevana Kirthi, we believe that every individual has the power to make a significant impact on our planet. Our mission is to inspire and empower people to reduce ocean pollution through engaging and immersive role-playing experiences.

How We Work:

By placing users in a variety of real-life scenarios, we aim to foster a deeper understanding of the consequences of human actions on our oceans. Our interactive platform allows users to take on different roles, exploring the potential outcomes of their choices. Through these immersive experiences, we hope to cultivate a sense of responsibility and inspire positive change.

Our Motto: "Small Actions, Big Impact."

We believe that even the smallest actions can have a profound effect on our environment. Our motto, "Small Actions, Big Impact," reflects our commitment to empowering individuals to make a difference. By making informed choices and taking steps to reduce their environmental footprint, users can contribute to a healthier and more sustainable future for our oceans.</p>
            </div>
            <div className='scuba'>
                <img className='scuba-icon' src={scuba} alt="ScubaDivers" />
            </div>
            <div className='sub'>
                <img className='sub-icon' src={sub} alt="Submarine" />
            </div>
            <div className="icons-section">
                <div className="icon-box">
                    <h2>Chat with AI</h2>
                    <p><br></br>We use the power of AI to make your experience better explore our chatbot and roleplay features to dive into the world of marine life and learn the lifecyle of marine life and also the consequences of actions on it. Ask and learn more about the sea from our Chatbot</p>
                    </div>
                <div className='spacer3'></div>
                <div className="icon-box">
                    <h2>Learn While Playing</h2>
                    <p><br></br>Try our fun game to learn more about the fishes and thier orgins, also you can check the market price of some species if you planning to go on a hunt. You can also explore and find out which species of fish and endangering.</p>
                    </div>
                <div className='spacer3'></div>
                <div className="icon-box">
                    <h2>Contribute to Community</h2>
                    <p>Also please read the blogs written by other marine enthuaists and participate in forums. Share valuable information to help the marine industry by writing blogging or uploapding datasets or files, research papers or your findings.</p>
                </div>
            </div>
            <Fishes />
            <div className='chat'>
                <button className="chatbot" onClick={toggleChat}>
                🤖ChatBot
                </button>
                {isChatOpen && <Chat toggleChat={toggleChat} />}
            </div>
            <div className='whale'>
                <img className="whale-icon" src={whale} alt="Whale" />
            </div>
            <div className='spacer2' />
            <div className='spacer' />
            <footer className="footer-section">
                <h3>Meet the Developers!!</h3>
                <div className='profiles'>
                <img className='flogo' src={logo}/>
                <div className='spacer2' />
                <div className='creator1'>
                
                </div>
                <div className='spacer2'></div>
                <div className='creator2'>
                
                </div>
                <div className='spacer2'></div>
                <div className='creator3'>
                
                </div>
                <div className='spacer2'></div>
                <div className='creator4'>
                
                </div>
                <div className='spacer2'></div>
                <div className='creator5'>
                
                </div>
                <div className='spacer2'></div>
                <div className='creator6'>
                
                </div>
                <div className='spacer2'></div>
                <div className="social-media-icons">
                    <a href = "#"></a>
                </div>
                </div>
                
      <p>@ 2024 Your Company. All rights reserved</p>
            </footer>
        </div>
    );
}
export default Home;
