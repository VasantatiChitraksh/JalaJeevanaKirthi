import React, { useEffect } from 'react';
import Phaser from 'phaser';
import './game.css';
import { Link,Navigate,useNavigate } from "react-router-dom";
import logo from '../assets/LOGO.jpg';
import Coral from '../assets/Coral.png';
import whale from '../assets/whale.png';

function FishCatch() {
    useEffect(() => {
        const scale = window.devicePixelRatio;
        const w = window.innerWidth * scale;
        const h = window.innerHeight * scale;
        let gamescene = new Phaser.Scene('Game');
        gamescene.preload = function () {
            this.load.image('background',Coral);
            this.load.image('player',whale);
        };
        gamescene.create = function () {
            this.pl = this.add.sprite(100,500,'player');
        };
        gamescene.update = function () {
            this.pl.x +=1;
        };

        let config = {
            type: Phaser.AUTO,
            height: h-100,
            width: w,
            scene: gamescene,
            parent: 'phaser-game' 
        };

        const game = new Phaser.Game(config);
        return () => {
            game.destroy(true);
        };
    }, []);
    const navigate = useNavigate();
    const handleOnclick1 = (e) => {
        navigate('/login');
     }
    const handleOnclick2 = (e) => {
        navigate('/');
     }
    return (
        <div className='main'>
            <div id="phaser-game"></div>
            <div className="topbar">
                <img className="logo-icon" src={logo} alt="Logo" />
                <h2 className="logo">Jala Jeevana Kirthi</h2>
                <button className="topbar-button" id="home_button" onClick={handleOnclick2}>Home</button>
                <button className="topbar-button" id="login_button" onClick={handleOnclick1}>Login</button>
            </div>
        </div>
    );
}

export default FishCatch;
