import React, { useEffect } from 'react';
import Phaser from 'phaser';

function FishCatch() {
    useEffect(() => {
        let gamescene = new Phaser.Scene('Game');
        gamescene.preload = function () {
        };
        gamescene.create = function () {

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
