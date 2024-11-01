import React, { useEffect } from 'react';
import Phaser from 'phaser';
import './game.css';
import { useNavigate } from "react-router-dom";
import logo from '../assets/LOGO.jpg';
import background from './gameassets/Items/game_background.jpg';

// Import all fish images
import acheRhom from './gameassets/fishes/Acheilognathusrhombeus.png';
import sword from './gameassets/fishes/swordfish.png';
import angelfish from './gameassets/fishes/blueringangelfish.png';
import lobster from './gameassets/fishes/blueLobster.png';
import tuna from './gameassets/fishes/atlanticbluefintuna.png';
import clownfish from './gameassets/fishes/clownfish.png';
import shark from './gameassets/fishes/GreatWhiteShark.png';
import haddock from './gameassets/fishes/haddock.png';
import mackeral from './gameassets/fishes/kingMackeral.png';
import mahi from './gameassets/fishes/mahi.png';
import salmon from './gameassets/fishes/salmon.png';
import shrimp from './gameassets/fishes/Shrimp.png';
import crab from './gameassets/fishes/spidercrab.png';
import whale from './gameassets/fishes/spremwhale.png';
import stingray from './gameassets/fishes/stingray.png';

function FishCatch() {
    useEffect(() => {
        const scale = window.devicePixelRatio;
        const w = window.innerWidth * scale;
        const h = window.innerHeight * scale;

        let gamescene = new Phaser.Scene('Game');

        gamescene.preload = function () {
            this.load.image('background', background);

            // Preload all fish images
            this.load.image('acheRhom', acheRhom);
            this.load.image('swordfish', sword);
            this.load.image('angelfish', angelfish);
            this.load.image('lobster', lobster);
            this.load.image('tuna', tuna);
            this.load.image('clownfish', clownfish);
            this.load.image('shark', shark);
            this.load.image('haddock', haddock);
            this.load.image('mackeral', mackeral);
            this.load.image('mahi', mahi);
            this.load.image('salmon', salmon);
            this.load.image('shrimp', shrimp);
            this.load.image('crab', crab);
            this.load.image('whale', whale);
            this.load.image('stingray', stingray);
        };

        gamescene.create = function () {
            this.add.image(w / 2, h / 2 - 31, 'background').setDisplaySize(w * 0.8, h * 0.8);

            // Add fish and set their motions
            const fishData = [
                { key: 'acheRhom', x: w + 50, y: h / 2 - 320, scale: 0.5, duration: 4000, direction: 'left' },
                { key: 'swordfish', x: -50, y: h / 2 - 150, scale: 0.35, duration: 2500, direction: 'right' },
                { key: 'angelfish', x: - 50, y: h / 2 + 150, scale: 0.3, duration: 4900, direction: 'right' },
                { key: 'lobster', x: -50, y: h / 2 + 240, scale: 0.1, duration: 6000, direction: 'right' },
                { key: 'tuna', x: -50, y: h / 2 - 100, scale: 0.35, duration: 4500, direction: 'right' },
                { key: 'clownfish', x: -50, y: h / 2 + 100, scale: 0.25, duration: 3500, direction: 'right' },
                { key: 'shark', x: w + 50, y: h / 2 + 40, scale: 0.7, duration: 3500, direction: 'left' },
                { key: 'haddock', x: w+50, y: h / 2 - 350, scale: 0.25, duration: 4500, direction: 'left' },
                { key: 'mackeral', x: w + 50, y: h / 2 -300, scale: 0.25, duration: 5500, direction: 'left' },
                { key: 'mahi', x: -50, y: h / 2 - 200, scale: 0.5, duration: 5000, direction: 'right' },
                { key: 'salmon', x: w + 50, y: h / 2 - 250, scale: 0.4, duration: 4000, direction: 'left' },
                { key: 'shrimp', x: -50, y: h / 2 + 180, scale: 0.3, duration: 9000, direction: 'right' },
                { key: 'crab', x: w + 50, y: h / 2 + 230, scale: 0.25, duration: 7500, direction: 'left' },
                { key: 'whale', x: -50, y: h / 2 + 220, scale: 0.4, duration: 4500, direction: 'right' },
                { key: 'stingray', x:- 50, y: h / 2 + 180, scale: 0.25, duration: 3000, direction: 'right' },
            ];

            // Loop through fish data to add each fish with unique tweens
            fishData.forEach((fish) => {
                const fishSprite = this.add.image(fish.x, fish.y, fish.key).setScale(fish.scale);

                this.tweens.add({
                    targets: fishSprite,
                    x: fish.direction === 'left' ? -50 : w + 50,
                    duration: fish.duration,
                    ease: 'Linear',
                    repeat: -1,
                    onRepeat: () => {
                        fishSprite.x = fish.direction === 'left' ? w + 50 : -50;
                    }
                });
            });
        };

        let config = {
            type: Phaser.AUTO,
            height: h - 100,
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

    const handleOnclick1 = () => {
        navigate('/login');
    };

    const handleOnclick2 = () => {
        navigate('/');
    };

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
