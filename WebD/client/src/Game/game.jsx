import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import './game.css';
import { useNavigate } from "react-router-dom";
import logo from '../assets/LOGO.jpg';
import axios from 'axios';
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

// Load additional assets
import bubbleImage from './gameassets/items/bubble.png';
import sunrays from './gameassets/items/sunrays.png';
import netImage from './gameassets/items/net.png';

function FishCatch() {

    let fishDetails;
    const [caughtFishName, setCaughtFishName] = useState(null);
    let isNetActive=true;

    useEffect(()=> {
        const fetchdetails = async () => {
            try {
                const response = await axios.get('http://localhost:3001/data/fishes'); 
                console.log("Response data:", response.data);
                const fishdata = response.data.reduce((acc, fish) => {
                    acc[fish.name] = fish; 
                    return acc;
                }, {});
        
                console.log("FishMap:", fishdata);
                fishDetails = fishdata;
        
            } catch (error) {
                console.error("Error fetching fish details:", error);
            }
        };
        
        fetchdetails();
    }, []);

    useEffect(() => {
        console.log("Updated Fish details:", fishDetails);
    }, [fishDetails]);

    useEffect(() => {
        const scale = window.devicePixelRatio;
        const w = window.innerWidth * scale;
        const h = window.innerHeight * scale;
        let gameScene = new Phaser.Scene('Game');

        gameScene.preload = function () {
            this.load.image('background', background);
            this.load.image('bubble', bubbleImage);
            this.load.image('sunrays', sunrays);
            this.load.image('net', netImage);

            // Preload all fish images
            const images = new Map([
                ['Rhombous Bitterling (Acheilognathus rhombeus)', acheRhom],
                ['Swordfish', sword],
                ['Angelfish', angelfish],
                ['Lobster', lobster],
                ['Yellow Fin Tuna', tuna],
                ['Clownfish', clownfish],
                ['Great White Shark', shark],
                ['Haddock', haddock],
                ['Mackerel', mackeral],
                ['Mahi-Mahi', mahi],
                ['Atlantic Salmon', salmon],
                ['Shrimp', shrimp],
                ['Spider Crab', crab],
                ['Sperm Whale', whale],
                ['Stingray', stingray]
            ]);
            images.forEach((value, key) => {
                this.load.image(key, value);
            });            
        };

        gameScene.create = function () {
            this.add.image(w / 2, h / 2, 'background').setDisplaySize(w, h);

            const sunraysSprite = this.add.image(w / 2, h / 2, 'sunrays').setScale(1.5);
            sunraysSprite.setAlpha(0.25);

            this.tweens.add({
                targets: sunraysSprite,
                alpha: { from: 0.5, to: 1 },
                duration: 3000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            const net = this.add.image(w / 2 - 500, h / 2 - 330, 'net').setInteractive();
            net.setScale(0.75);
            this.input.setDraggable(net);
            this.physics.add.existing(net);

            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
            },
        );            

            const catchFish = (fish, fishName) => {
                if (!caughtFishName  && isNetActive) {
                    setCaughtFishName(fishName);
                    isNetActive = false;
            
                    const flashCardContainer = this.add.container(w / 2 - 350, h / 2 - 200);
                    const flashCardBackground = this.add.graphics();
                    flashCardBackground.fillStyle(0xF9D57C, 1);
                    flashCardBackground.fillRoundedRect(0, 0, 600, 400, 10);
                    flashCardContainer.add(flashCardBackground);
                    
                    console.log("The fish :",fishDetails);
                    const details = fishDetails[fishName];
                    console.log("Details",details);
                    const detailFields = [
                        { label: 'Name:', value: details.name },
                        { label: 'Average Weight:', value: details.weight },
                        { label: 'Average Height:', value: details.height },
                        { label: 'Origin:', value: details.origin },
                        { label: 'Status:', value: details.status },
                        { label: 'Habitat:', value: details.habitat },
                        { label: 'Reason for Shortage:', value: details.shortage },
                        { label: 'Fun Fact:', value: details.fact },
                        { label: 'Points:', value: details.points}
                    ];

                    detailFields.forEach((detail, index) => {
                        const text = this.add.text(20, 20 + index * 30, `${detail.label} ${detail.value}`, {
                            fontSize: '16px',
                            color: '#ffffff',
                            fontFamily: 'Arial',
                            padding: { x: 10, y: 15 }
                        });
                        flashCardContainer.add(text);
                    });
            
                    const fishImage = this.add.image(w / 2 - 500, h / 2 - 300, fishName).setScale(0.25); 
                    flashCardContainer.add(fishImage);
            
                    const continueButton = this.add.text(w / 2 - 700, h / 2 - 100, 'CONTINUE', {
                        fontSize: '24px',
                        color: '#000000',
                        backgroundColor: '#F9D57C',
                        fontFamily: 'Arial',
                        padding: { x: 0, y: 5 },
                    }).setOrigin(0.5).setInteractive();
                    flashCardContainer.add(continueButton);
            
                    const exitButton = this.add.text(w / 2 - 500, h / 2 - 100, 'EXIT', {
                        fontSize: '24px',
                        color: '#000000',
                        backgroundColor: '#F9D57C',
                        fontFamily: 'Arial',
                        padding: { x: 10, y: 5 },
                    }).setOrigin(0.5).setInteractive();
                    flashCardContainer.add(exitButton);
            
                    exitButton.on('pointerup', () => navigate('/'));
                    continueButton.on('pointerup', () => {
                        flashCardContainer.destroy();
                        net.setPosition(w / 2 - 500, h / 2 - 330);
                        setCaughtFishName(null);
                        isNetActive = true;
                        fish.visible = false;
                    });
            
                    fish.visible = false;
                }
            };
            

            // Fish data
            const fishData = [
                { key: 'Haddock', x: w + 50, y: h / 2 - 175, scale: 0.25, duration: 3600, direction: 'left' },
                { key: 'Rhombous Bitterling (Acheilognathus rhombeus)', x: w + 50, y: h / 2 - 165, scale: 0.4, duration: 3200, direction: 'left' },
                { key: 'Mackerel', x: w + 50, y: h / 2 - 100, scale: 0.25, duration: 4500, direction: 'left' },
                { key: 'Atlantic Salmon', x: w + 50, y: h / 2 - 35, scale: 0.4, duration: 3000, direction: 'left' },
                { key: 'Mahi-Mahi', x: -50, y: h / 2 - 100, scale: 0.5, duration: 3800, direction: 'right' },
                { key: 'Yellow Fin Tuna', x: -50, y: h / 2 - 70, scale: 0.35, duration: 3500, direction: 'right' },
                { key: 'Swordfish', x: -50, y: h / 2 - 40, scale: 0.35, duration: 2000, direction: 'right' },
                { key: 'Clownfish', x: -50, y: h / 2 - 10, scale: 0.25, duration: 3100, direction: 'right' },
                { key: 'Angelfish', x: -50, y: h / 2 + 70, scale: 0.3, duration: 4000, direction: 'right' },
                { key: 'Shrimp', x: -50, y: h / 2 + 50, scale: 0.3, duration: 7000, direction: 'right' },
                { key: 'Stingray', x: -50, y: h / 2 + 220, scale: 0.25, duration: 3500, direction: 'right' },
                { key: 'Sperm Whale', x: -50, y: h / 2 + 110, scale: 0.4, duration: 4500, direction: 'right' },
                { key: 'Spider Crab', x: w + 50, y: h / 2 + 140, scale: 0.25, duration: 7500, direction: 'left' },
                { key: 'Lobster', x: -50, y: h / 2 + 170, scale: 0.1, duration: 6000, direction: 'right' },
                { key: 'Great White Shark', x: w + 50, y: h / 2 + 200, scale: 0.7, duration: 3500, direction: 'left' },
            ];

            // Add each fish and set motion
            fishData.forEach((fishInfo) => {
                const fishSprite = this.add.image(fishInfo.x, fishInfo.y, fishInfo.key).setScale(fishInfo.scale);
                this.physics.add.existing(fishSprite);  // Add fish to physics

                this.tweens.add({
                    targets: fishSprite,
                    x: fishInfo.direction === 'left' ? -50 : w + 50,
                    duration: fishInfo.duration,
                    ease: 'Linear',
                    repeat: -1,
                    onRepeat: () => {
                        fishSprite.x = fishInfo.direction === 'left' ? w + 50 : -50;
                    }
                });

                // Check for overlap between net and fish
                this.physics.add.overlap(net, fishSprite, () => {
                    if (fishSprite.visible && isNetActive) {  // Only catch fish if it's visible
                        catchFish(fishSprite, fishInfo.key);
                    }
                });

            });

            const bubbles = this.add.particles('bubble');
            bubbles.createEmitter({
                x: { min: 0, max: w },
                y: h,
                lifespan: 6000,
                speedY: { min: -50, max: -100 },
                scale: { start: 0.1, end: 0.3 },
                quantity: 1,
                frequency: 1000,
                alpha: { start: 0.5, end: 0 }
            });
        };

        const config = {
            type: Phaser.AUTO,
            width: w,
            height: h,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            scene: gameScene
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