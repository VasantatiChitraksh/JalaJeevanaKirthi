import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Coral from '../assets/Coral.png';
import whale from '../assets/whale.png';

function FishCatch() {
    useEffect(() => {
        let gamescene = new Phaser.Scene('Game');
        gamescene.preload = function () {
            this.load.image('background',Coral);
            this.load.image('player',whale);
        };
        gamescene.create = function () {
            let bg = this.add.sprite(0,0,'background');
            let gameW = this.sys.game.config.width;
            let gameH = this.sys.game.config.height;
            bg.setPosition(gameW/2,gameH/2);
            bg.setScale(1.25,1.25);

            let pl = this.add.sprite(150,100,'player');
            pl.angle++;
            pl.ScaleX = 1;
            pl.scaleY = 1;
        };
        gamescene.update = function () {
        };

        let config = {
            type: Phaser.AUTO,
            height: 360,
            width: 640,
            scene: gamescene,
            parent: 'phaser-game' 
        };

        const game = new Phaser.Game(config);
        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <div className='main'>
            <div id="phaser-game"></div>
        </div>
    );
}

export default FishCatch;
