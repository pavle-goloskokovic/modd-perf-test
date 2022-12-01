/**
 * Game entry point
 */

import '../css/style.css'; // loading css

import 'phaser'; // loading Phaser with dependencies

import _forEach from 'lodash-es/forEach';
import * as logger from 'js-logger';

import * as gameConfig from './game.config';

import PhaserStatsGame from './classes/PhaserStatsGame';

import Boot from './scenes/boot';
import Preloader from './scenes/preloader';
import Game from './scenes/game';

/**
 * Setup logger
 */
logger.useDefaults();
logger.setLevel(gameConfig.logLevel);

/**
 * Phaser game config
 * @type {Phaser.Types.Core.GameConfig}
 */
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'container',     // parent id - '' means  no container
    scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
        width: '100%',
        height: '100%',
        autoRound: true,
        resizeInterval: 100
    },
    render: {
        pixelArt: false,
        transparent: false
    },
    fps: {
        smoothStep: false
    },
    loader: {
        crossOrigin: 'anonymous'
    }
};

/**
 * Phaser game instance
 * Choosing implementation based on 'stats' app config setting
 * @type {Phaser.Game}
 */
let game: Phaser.Game;
if(gameConfig.stats && process.env.NODE_ENV !== 'production')
{
    game = new PhaserStatsGame(config);
}
else
{
    game = new Phaser.Game(config);
}

/**
 * Registering game scenes
 */
_forEach({
    boot: Boot,
    preloader: Preloader,
    game: Game
}, function (scene, key)
{
    game.scene.add(key, scene);
});

game.scene.start('boot');
