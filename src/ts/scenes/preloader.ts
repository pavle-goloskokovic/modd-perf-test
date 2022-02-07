import * as logger from 'js-logger';

/**
 * Preloader Phaser scene.
 *
 * This is where we load all the assets including images, sounds and all relevant data
 * before starting the game.
 */
export default class Preloader extends Phaser.Scene {

    preload (): void
    {
        logger.info('Preloader enter');

        this.load.image('tilesheet_complete', require('../../assets/images/1524311504249_tilesheet.png'));
    }

    create (): void
    {
        logger.info('Preloader leave');

        this.scene.start('game');
    }

}
