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
            sunraysSprite.setAlpha(0.5);  // Set initial transparency

            // Create sunrays animation
            this.tweens.add({
                targets: sunraysSprite,
                alpha: { from: 0.5, to: 1 },
                duration: 3000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            // Create the fishing net sprite
            const net = this.add.image(w / 2-500, h / 2-300, 'net').setInteractive();
            net.setScale(0.75);
            this.input.setDraggable(net);
            this.physics.add.existing(net);  // Add net to physics

            // Drag event for the fishing net
            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });

            // Function to handle fish catching
            const catchFish = (fish, fishName) => {
                if (!caughtFishName) {
                    caughtFishName = fishName;

                    // Create flash card graphics
                    const flashCard = this.add.graphics();
                    flashCard.fillStyle(0x000000, 0.7);
                    flashCard.fillRoundedRect(w / 2 - 100, h / 2 - 50, 200, 100, 10);

                    const text = this.add.text(w / 2, h / 2, `${fishName} caught!`, {
                        fontSize: '20px',
                        color: '#ffffff'
                    }).setOrigin(0.5);

                    const continueButton = this.add.text(w / 2 -40, h / 2 + 30, 'Continue', {
                        fontSize: '16px',
                        color: '#ffffff',
                        backgroundColor: '#000000',
                        padding: { x: 10, y: 5 },
                        borderRadius: 5,
                    }).setOrigin(0.5).setInteractive();

                    const exit = this.add.text(w / 2 + 40, h / 2 +30, 'Exit', {
                        fontSize: '16px',
                        color: '#ffffff',
                        backgroundColor: '#000000',
                        padding: { x: 10, y: 5 },
                        borderRadius: 5,
                    }).setOrigin(0.5).setInteractive();

                    exit.on('pointerup', () => {
                        navigate('/');
                    });
                    // Add continue button interaction
                    continueButton.on('pointerdown', () => {
                        flashCard.destroy();
                        text.destroy();
                        continueButton.destroy();
                        exit.destroy();
                        caughtFishName = null;  // Reset for next catch
                    });

                    // Hide the caught fish
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