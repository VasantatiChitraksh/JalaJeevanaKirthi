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

// Load additional assets
import bubbleImage from './gameassets/items/bubble.png';
import sunrays from './gameassets/items/sunrays.png';
import netImage from './gameassets/items/net.png';

function FishCatch() {

    useEffect(() => {
        const scale = window.devicePixelRatio;
        const w = window.innerWidth * scale;
        const h = window.innerHeight * scale;

        let caughtFishName = null;
        let gameScene = new Phaser.Scene('Game');

        gameScene.preload = function () {
            this.load.image('background', background);
            this.load.image('bubble', bubbleImage);
            this.load.image('sunrays', sunrays);
            this.load.image('net', netImage);

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
            });

            const fishDetails = {
                'acheRhom': {
                    name: 'Acherontis Rhombifer',
                    weight: '1.5–2 kg',
                    height: '0.4 meters',
                    origin: 'Amazon Basin',
                    status: 'Vulnerable',
                    habitat: 'Freshwater rivers',
                    shortage: 'Overfishing and habitat loss',
                    fact: 'Acherontis Rhombifer is known for its distinctive rhomboid body shape.'
                },
                'angelfish': {
                    name: 'Angelfish',
                    weight: 'Up to 2 kg',
                    height: 'Up to 0.5 meters',
                    origin: 'South America',
                    status: 'Least Concern',
                    habitat: 'Freshwater rivers and streams',
                    shortage: 'Invasive species in some regions',
                    fact: 'Angelfish are popular in home aquariums due to their striking appearance.'
                },
                'clownfish': {
                    name: 'Clownfish',
                    weight: '200 grams',
                    height: '11 cm',
                    origin: 'Indian and Pacific Oceans',
                    status: 'Least Concern',
                    habitat: 'Warm sea reefs',
                    shortage: 'Coral reef destruction',
                    fact: 'Clownfish have a symbiotic relationship with sea anemones.'
                },
                'lobster': {
                    name: 'Lobster',
                    weight: 'Up to 9 kg',
                    height: 'Up to 1 meter (with claws)',
                    origin: 'North Atlantic',
                    status: 'Near Threatened',
                    habitat: 'Cold coastal waters',
                    shortage: 'Overfishing and habitat disruption',
                    fact: 'Lobsters can regenerate lost limbs.'
                },
                'tuna': {
                    name: 'Tuna',
                    weight: 'Up to 684 kg',
                    height: 'Up to 3 meters',
                    origin: 'Worldwide (warm oceans)',
                    status: 'Vulnerable',
                    habitat: 'Open ocean',
                    shortage: 'Overfishing for commercial purposes',
                    fact: 'Tuna are among the fastest swimmers in the ocean, reaching speeds of up to 75 km/h.'
                },
                'shark': {
                    name: 'Great White Shark',
                    weight: 'Up to 1,100 kg',
                    height: 'Up to 6.4 meters',
                    origin: 'Worldwide (coastal waters)',
                    status: 'Vulnerable',
                    habitat: 'Coastal and offshore waters',
                    shortage: 'Overfishing for fins and accidental bycatch',
                    fact: 'Great White Sharks can sense a drop of blood in 100 liters of water.'
                },
                'haddock': {
                    name: 'Haddock',
                    weight: '1–3 kg',
                    height: 'Up to 1 meter',
                    origin: 'North Atlantic',
                    status: 'Least Concern',
                    habitat: 'Cold deep waters',
                    shortage: 'Overfishing in some regions',
                    fact: 'Haddock is a popular fish for cooking, often used in fish and chips.'
                },
                'mackeral': {
                    name: 'Mackerel',
                    weight: '0.5–2 kg',
                    height: 'Up to 60 cm',
                    origin: 'Atlantic and Pacific Oceans',
                    status: 'Least Concern',
                    habitat: 'Open ocean, near surface',
                    shortage: 'Overfishing and climate change',
                    fact: 'Mackerel have a streamlined body that allows them to swim quickly through the water.'
                },
                'mahi': {
                    name: 'Mahi-Mahi',
                    weight: '7–20 kg',
                    height: 'Up to 1.5 meters',
                    origin: 'Tropical and subtropical oceans',
                    status: 'Least Concern',
                    habitat: 'Warm surface waters',
                    shortage: 'Climate change and overfishing',
                    fact: 'Mahi-Mahi are known for their vibrant colors and rapid growth rates.'
                },
                'salmon': {
                    name: 'Atlantic Salmon',
                    weight: 'Up to 30 kg',
                    height: 'Up to 1.5 meters',
                    origin: 'North Atlantic Ocean',
                    status: 'Vulnerable',
                    habitat: 'Rivers and coastal waters',
                    shortage: 'Overfishing and habitat loss',
                    fact: 'Salmon are famous for their long migrations upstream to spawn.'
                },
                'shrimp': {
                    name: 'Shrimp',
                    weight: '10–20 grams',
                    height: '5–12 cm',
                    origin: 'Worldwide (coastal waters)',
                    status: 'Least Concern',
                    habitat: 'Shallow coastal waters',
                    shortage: 'Overfishing in some regions',
                    fact: 'Shrimp are a primary food source for many marine animals.'
                },
                'crab': {
                    name: 'Blue Crab',
                    weight: 'Up to 1 kg',
                    height: 'Up to 23 cm (width)',
                    origin: 'Western Atlantic',
                    status: 'Near Threatened',
                    habitat: 'Estuaries and coastal waters',
                    shortage: 'Overharvesting and habitat degradation',
                    fact: 'Blue Crabs are named for their blue claws and legs.'
                },
                'swordfish': {
                    name: 'Swordfish',
                    weight: '150–650 kg',
                    height: 'Up to 4.5 meters',
                    origin: 'Worldwide (tropical and temperate oceans)',
                    status: 'Least Concern',
                    habitat: 'Open ocean',
                    shortage: 'Overfishing and accidental bycatch',
                    fact: 'Swordfish are named for their long, flat bill, which they use to slash through schools of fish.'
                },
                'whale': {
                    name: 'Blue Whale',
                    weight: 'Up to 190,000 kg',
                    height: 'Up to 30 meters',
                    origin: 'Worldwide (open ocean)',
                    status: 'Endangered',
                    habitat: 'Open ocean',
                    shortage: 'Hunting and habitat loss',
                    fact: 'Blue Whales are the largest animals on Earth, and their calls can be heard over great distances underwater.'
                },
                'stingray': {
                    name: 'Stingray',
                    weight: 'Up to 350 kg',
                    height: 'Up to 4 meters (including tail)',
                    origin: 'Worldwide (coastal waters)',
                    status: 'Near Threatened',
                    habitat: 'Shallow coastal waters and sandy seabeds',
                    shortage: 'Overfishing and habitat degradation',
                    fact: 'Stingrays have a venomous stinger on their tail used for defense.'
                }
            };
            

            const catchFish = (fish, fishName) => {
                if (!caughtFishName) {
                    caughtFishName = fishName;
            
                    const flashCardContainer = this.add.container(w / 2 - 350, h / 2 - 200);
            
                    const flashCardBackground = this.add.graphics();
                    flashCardBackground.fillStyle(0xF9D57C, 1);
                    flashCardBackground.fillRoundedRect(0, 0, 600, 400, 10);
                    flashCardContainer.add(flashCardBackground);
            
                    const details = fishDetails[fishName];
            
                    const detailFields = [
                        { label: 'Name:', value: details.name },
                        { label: 'Average Weight:', value: details.weight },
                        { label: 'Average Height:', value: details.height },
                        { label: 'Origin:', value: details.origin },
                        { label: 'Status:', value: details.status },
                        { label: 'Habitat:', value: details.habitat },
                        { label: 'Reason for Shortage:', value: details.shortage }, // Fixing 'reason' to 'shortage'
                        { label: 'Fun Fact:', value: details.fact }
                    ];
            
                    detailFields.forEach((detail, index) => {
                        const text = this.add.text(20, 20 + index * 30, `${detail.label} ${detail.value}`, { // Fixed interpolation
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
                        caughtFishName = null;
                        fish.visible = false;
                    });
            
                    fish.visible = false;
                }
            };
            

            // Fish data
            const fishData = [
                { key: 'haddock', x: w + 50, y: h / 2 - 175, scale: 0.25, duration: 3600, direction: 'left' },
                { key: 'acheRhom', x: w + 50, y: h / 2 - 165, scale: 0.4, duration: 3200, direction: 'left' },
                { key: 'mackeral', x: w + 50, y: h / 2 - 100, scale: 0.25, duration: 4500, direction: 'left' },
                { key: 'salmon', x: w + 50, y: h / 2 - 35, scale: 0.4, duration: 3000, direction: 'left' },
                { key: 'mahi', x: -50, y: h / 2 - 100, scale: 0.5, duration: 3800, direction: 'right' },
                { key: 'tuna', x: -50, y: h / 2 - 70, scale: 0.35, duration: 3500, direction: 'right' },
                { key: 'swordfish', x: -50, y: h / 2 - 40, scale: 0.35, duration: 2000, direction: 'right' },
                { key: 'clownfish', x: -50, y: h / 2 - 10, scale: 0.25, duration: 3100, direction: 'right' },
                { key: 'angelfish', x: -50, y: h / 2 + 70, scale: 0.3, duration: 4000, direction: 'right' },
                { key: 'shrimp', x: -50, y: h / 2 + 50, scale: 0.3, duration: 7000, direction: 'right' },
                { key: 'stingray', x: -50, y: h / 2 + 220, scale: 0.25, duration: 3500, direction: 'right' },
                { key: 'whale', x: -50, y: h / 2 + 110, scale: 0.4, duration: 4500, direction: 'right' },
                { key: 'crab', x: w + 50, y: h / 2 + 140, scale: 0.25, duration: 7500, direction: 'left' },
                { key: 'lobster', x: -50, y: h / 2 + 170, scale: 0.1, duration: 6000, direction: 'right' },
                { key: 'shark', x: w + 50, y: h / 2 + 200, scale: 0.7, duration: 3500, direction: 'left' },
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
                    if (fishSprite.visible) {  // Only catch fish if it's visible
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