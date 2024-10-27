import { Phaser } from "./phaser";

let gamescene = new Phaser.Scene('Game');
let config = {
    type: Phaser.AUTO,
    height: 360,
    width: 640,
    scene: gamescene
};

let game = new Phaser.Game(config);