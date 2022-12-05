import * as logger from 'js-logger';
import BitmapFontManager from '../classes/BitmapFontManager';

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

        this.load.image('blood', require('../../assets/images/1589508229977_Blood_Red_Puddle.png'));
        this.load.image('rocks', require('../../assets/images/1589568802553_Stone_Rocks.png'));
        this.load.image('tree', require('../../assets/images/1589643910648_tree.png'));
        this.load.image('log', require('../../assets/images/1589815468723_1588262615812_Tree_Trunk_Log_Wood_Circle.png'));
        this.load.image('wall', require('../../assets/images/1589816787776_1588262552245_Stone_Rock_Circle_Wall.png'));
        this.load.image('meat', require('../../assets/images/1589817480532_meat.png'));
        this.load.image('helmet', require('../../assets/images/1589846449835_helmet.png'));
        this.load.image('fur', require('../../assets/images/1589857655168_fur.png'));

        this.load.image('bear', require('../../assets/images/1589645036846_brown_bear.png'));
        this.load.image('pig', require('../../assets/images/1589646609302_pig.png'));
        this.load.image('human', require('../../assets/images/1589924067451_1588203181380_Man_Human_Person.png'));
        this.load.image('axe', require('../../assets/images/1588116115083_axe.png'));

        this.load.bitmapFont('font',
            require('../../assets/images/myBitmapfont.png'),
            require('../../assets/fonts/font.xml')
        );

        /*this.load.bitmapFont('Verdana',
            require('../../assets/images/Verdana_0.png'),
            require('../../assets/fonts/Verdana.xml')
        );*/

        /*this.load.bitmapFont('Verdana',
            require('../../assets/images/Verdana_0.png'),
            require('../../assets/fonts/Verdana-outline.xml')
        );*/

        BitmapFontManager.preload(this);

        this.load.image('stroke',
            require('../../assets/images/attribute-bar/stroke.png'));
        this.load.image('fill',
            require('../../assets/images/attribute-bar/fill.png'));
        this.load.image('fill-side',
            require('../../assets/images/attribute-bar/fill-side.png'));
    }

    create (): void
    {
        BitmapFontManager.create(this);

        logger.info('Preloader leave');

        this.scene.start('game');
    }

}
