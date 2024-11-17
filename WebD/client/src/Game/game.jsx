import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import './game.css';
import { useNavigate } from "react-router-dom";
import logo from '../assets/LOGO.jpg';
import axios from 'axios';
import background from './gameassets/Items/game_background.jpg';
import wave_sound from './gameassets/sounds/waves.mp3';

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
import bird1 from './gameassets/Items/bird1.png';
import bird2 from './gameassets/Items/bird2.png';


// Load additional assets
import netImage from './gameassets/Items/net.png';

//Load waste assest
import waste_bottle from './gameassets/Items/waste_bottle.png';
import waste_can from './gameassets/Items/waste_can.png';
import waste_banana from './gameassets/Items/waste_banana.png';
import waste_plastic from './gameassets/Items/waste_plastic.png';

function FishCatch() {

    let fishDetails;
    const [score, setScore] = useState(0);
    const [caughtFishName, setCaughtFishName] = useState(null);
    let isNetActive=true;

    useEffect(()=> {
        const fetchdetails = async () => {
            try {
                const response = await axios.get('https://ug2-team3-se-webd-1.onrender.com/data/fishes'); 
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
            this.load.image('net', netImage);
            this.load.image('bird1' , bird1);
            this.load.image('bird2' ,bird2);
            this.load.audio('waves',wave_sound);

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
                ['Stingray', stingray],
                ['Waste_Bottle', waste_bottle],
                ['Waste_Can', waste_can],
                ['Waste_Banana', waste_banana],
                ['Waste_Plastic', waste_plastic],
            ]);
            images.forEach((value, key) => {
                this.load.image(key, value);
            });            
        };

        gameScene.create = function () { 
            this.add.image(w / 2, h / 2-20, 'background').setDisplaySize(w,h);
            let waves_audio = this.sound.add('waves');
            waves_audio.play();

            this.add.image(w/7,h/8,'bird1').setScale(0.5);
            this.add.image(w/5,h/6,'bird2').setScale(0.5);
            this.add.image(w - w/7,h/8,'bird1').setScale(0.5);
            this.add.image(w-w/5,h/6,'bird2').setScale(0.5);

            const net = this.add.image(w / 2 - 100, h / 2 - 350, 'net').setInteractive();
            net.setScale(0.75);
            this.input.setDraggable(net);
            this.physics.add.existing(net);

            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
            },
            );
            const wasteItems = [
                { key: 'Waste_Bottle', x: w/2+50, y: h/2 + 150, scale: 0.2 },
                { key: 'Waste_Bottle', x: w/2+400, y: h/2 - 150, scale: 0.2 },
                { key: 'Waste_Can', x: w/2 + 350, y: h/2+200, scale: 0.75 },
                { key: 'Waste_Banana', x: w/2 - 250, y: h/2-100, scale: 0.25 },
                { key: 'Waste_Plastic', x: w/2 - 550, y: h/2 - 200, scale: 0.5 }
            ];                      

            wasteItems.forEach(waste => {
                const wasteSprite = this.add.image(waste.x, waste.y, waste.key).setScale(waste.scale);
                this.physics.add.existing(wasteSprite);
                wasteSprite.setInteractive();

                this.tweens.add({
                    targets: wasteSprite,
                    y: wasteSprite.y - 30, 
                    duration: 2000,         
                    ease: 'Sine.easeInOut', 
                    yoyo: true,             
                    repeat: -1             
                });

                this.physics.add.overlap(net, wasteSprite, () => {
                    if (wasteSprite.visible && isNetActive) { 
                         catchWaste(waste.key);
                         wasteSprite.visible = false;
                    }
                });   
            });

            const catchWaste = (wasteName) => {
                if (isNetActive) {
                    isNetActive = false;
            
                    setScore(prevScore => prevScore - 100);
                    setCaughtFishName(`Waste Item: ${wasteName}`);
                    
                    displayWasteDetails(wasteName); // Display waste item details, if any
                }
            };
            
            const displayWasteDetails = (wasteName) => {
                const wasteDetailContainer = this.add.container(w / 2 - 150, h / 2 - 150);
                const wasteBackground = this.add.graphics();
                wasteBackground.fillStyle(0x0077BE, 1);
                wasteBackground.fillRoundedRect(0, 0, 300, 300, 10);
                wasteDetailContainer.add(wasteBackground);
            
                const wasteText = this.add.text(20, 20, `Collected: ${wasteName}\nAvoid throwing waste into the oceans, it causes a lot of environmental damage and kills marine life. Also wastes the resources of fisherman who are trying to catch fishes and reduces thier revenue leading to a hard hit of thier life.Hopefully this point deduction simulated the negative effect it has.`, {
                    fontSize: '16px',
                    color: '#ffffff',
                    fontFamily: 'Roboto',
                    padding: { x: 10, y: 5 },
                    wordWrap: { width: 250, useAdvancedWrap: true }
                });
                wasteDetailContainer.add(wasteText);
            
                const continueButton = this.add.text(w / 2 - 800, h / 2 - 180, 'CONTINUE', {
                    fontSize: '24px',
                    color: '#000000',
                    backgroundColor: '#0077BE',
                    fontFamily: 'Roboto',
                    padding: { x: 0, y: 5 },
                }).setOrigin(0.5).setInteractive();
                wasteDetailContainer.add(continueButton);
            
                continueButton.on('pointerup', () => {
                    wasteDetailContainer.destroy();
                    net.setPosition(w / 2 - 100, h / 2 - 400);
                    
                    isNetActive = true;
                });
            };         

        const catchFish = (fish, fishName) => {
            if (!caughtFishName && isNetActive) {
                isNetActive = false;
                const details = fishDetails[fishName];
                const fishPoints = details.points;
                
                setScore(prevScore => {
                    const newScore = prevScore + fishPoints;
                    if (newScore >= 1000) {
                        setCaughtFishName(fishName);
        
                        const fishDetailContainer = this.add.container(w / 2 - 350, h / 2 - 250);
                        const fishDetailBackground = this.add.graphics();
                        fishDetailBackground.fillStyle(0x0077BE, 1);
                        fishDetailBackground.fillRoundedRect(0, 0, 600, 500, 10);
                        fishDetailContainer.add(fishDetailBackground);
        
                        const detailFields = [
                            { label: 'Name:', value: details.name },
                            { label: 'Average Weight:', value: details.weight },
                            { label: 'Average Height:', value: details.height },
                            { label: 'Origin:', value: details.origin },
                            { label: 'Status:', value: details.status },
                            { label: 'Habitat:', value: details.habitat },
                            { label: 'Reason for Shortage:', value: details.shortage },
                            { label: 'Fun Fact:', value: details.fact },
                            { label: 'Points:', value: details.points }
                        ];
        
                        const lineHeight = 45;
                        detailFields.forEach((detail, index) => {
                            const text = this.add.text(20, 20 + index * lineHeight, `${detail.label} ${detail.value}`, {
                                fontSize: '16px',
                                color: '#ffffff',
                                fontFamily: 'Roboto',
                                padding: { x: 10, y: 15 },
                                wordWrap: { width: 450, useAdvancedWrap: true }
                            });
                            fishDetailContainer.add(text);
                        });

                        const fishImage = this.add.image(w / 2 - 100, h / 2 - 300, fishName).setScale(0.25);
                        fishDetailContainer.add(fishImage);
                        setTimeout(() => {
                            fishDetailContainer.destroy();
                            showGameOver();
                        }, 3000);
        
                    } else {
                        setCaughtFishName(fishName);
                        isNetActive = false;
                        displayFishDetails(fish, fishName, details);
                    }
                    
                    fish.visible = false;
                    return newScore;
                });
            }
        };
        
        const showGameOver = () => {
            const gameOverContainer = this.add.container(w / 2 - 350, h / 2 - 200);
            const gameOverBackground = this.add.graphics();
            gameOverBackground.fillStyle(0x0077BE, 1);
            gameOverBackground.fillRoundedRect(0, 0, 600, 400, 10);
            gameOverContainer.add(gameOverBackground);
        
            const gameOverText = this.add.text(20, 20, "GAME OVER", {
                fontSize: '36px',
                color: '#ffffff',
                fontFamily: 'Roboto',
                padding: { x: 10, y: 15 },
            });
            gameOverContainer.add(gameOverText);
        
            const exitButton = this.add.text(w / 2 - 500, h / 2 - 100, 'EXIT', {
                fontSize: '24px',
                color: '#000000',
                backgroundColor: '#0077BE',
                fontFamily: 'Roboto',
                padding: { x: 10, y: 5 },
            }).setOrigin(0.5).setInteractive();
            gameOverContainer.add(exitButton);
        
            exitButton.on('pointerup', () => navigate('/'));
        };
        
        const displayFishDetails = (fish, fishName, details) => {
            const detailContainer = this.add.container(w / 2 - 350, h / 2 - 250);
            const detailBackground = this.add.graphics();
            detailBackground.fillStyle(0x0077BE, 1);
            detailBackground.fillRoundedRect(0, 0, 700, 500, 10);
            detailContainer.add(detailBackground);
        
            const detailFields = [
                { label: 'Name:', value: details.name },
                { label: 'Average Weight:', value: details.weight },
                { label: 'Average Height:', value: details.height },
                { label: 'Origin:', value: details.origin },
                { label: 'Status:', value: details.status },
                { label: 'Habitat:', value: details.habitat },
                { label: 'Reason for Shortage:', value: details.shortage },
                { label: 'Fun Fact:', value: details.fact },
                { label: 'Points:', value: details.points }
            ];
            
            const linewidth = 600;
            const lineHeight = 40;
            detailFields.forEach((detail, index) => {
                const text = this.add.text(20, 20 + index * lineHeight, `${detail.label} ${detail.value}`, {
                    fontSize: '16px',
                    color: '#ffffff',
                    fontFamily: 'Roboto',
                    padding: { x: 10, y: 15 },
                    wordWrap: { width: linewidth, useAdvancedWrap: true }
                });
                detailContainer.add(text);
            });
            
            const fishImage = this.add.image(w / 2 - 500, h / 2 - 300, fishName).setScale(0.25);
            detailContainer.add(fishImage);
            const exitButton = this.add.text(w / 2 - 550, h / 2 , 'EXIT', {
                        fontSize: '24px',
                        color: '#000000',
                        backgroundColor: '#0077BE',
                        fontFamily: 'Roboto',
                        padding: { x: 10, y: 5 },
            }).setOrigin(0.5).setInteractive();
            detailContainer.add(exitButton);
                    
            exitButton.on('pointerup', () => navigate('/'));
            const continueButton = this.add.text(w / 2 - 800, h / 2, 'CONTINUE', {
                fontSize: '24px',
                color: '#000000',
                backgroundColor: '#0077BE',
                fontFamily: 'Roboto',
                padding: { x: 0, y: 5 },
            }).setOrigin(0.5).setInteractive();
            detailContainer.add(continueButton);
        
            continueButton.on('pointerup', () => {
                detailContainer.destroy();
                net.setPosition(w / 2 - 100, h / 2 - 400);
                setCaughtFishName(null);
                isNetActive = true;
                fish.visible = false;
            });
        
            fish.visible = false;
        };
        
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
                { key: 'Great White Shark', x: w + 50, y: h / 2 + 200, scale: 0.7, duration: 3500, direction: 'left' }
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
                    if (fishSprite.visible && isNetActive) { 
                         catchFish(fishSprite, fishInfo.key);
                    }
                });   
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

    

    const handleOnclick2 = () => {
        navigate('/');
    };

    return (
        <div className="main">
            <div id="phaser-game"></div>
            <div className="topbar">
                <img className="logo-icon" src={logo} alt="Logo" />
                <h2 className="logo">JalaJeevanaKirthi</h2>
                <button className="topbar-button" id="home_button" onClick={handleOnclick2}>Home</button>
                <div className="score-container">
                <h3>Score: {score}</h3> {/* Displaying the current score */}
            </div>
            </div>            
        </div>
    );
    
}

export default FishCatch;