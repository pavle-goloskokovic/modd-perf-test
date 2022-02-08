import * as logger from 'js-logger';

/**
 * Game Phaser scene.
 *
 * This is where all the logic for your game goes.
 */
export default class Game extends Phaser.Scene {

    controls: Phaser.Cameras.Controls.FixedKeyControl;

    create (): void
    {
        logger.info('Game enter');

        // this.cameras.main.setZoom(3/11);

        const map = this.make.tilemap({
            width: 1000,
            height: 1000,
            tileWidth: 64,
            tileHeight: 64
        });

        const tiles = map.addTilesetImage('tilesheet_complete', null, 64,64);

        const indexes: number[] = [];
        for (let i = -1; i < 540; i++) { indexes.push(i); }
        ['floor', 'floor2', 'debris', 'walls', 'trees'].forEach((layerName) =>
        {
            const layer = map.createBlankLayer(layerName, tiles);
            layer.randomize(0, 0, map.width, map.height, indexes);

            console.log(layer);
            console.log(layer.layer);
        });

        const items = ['blood','rocks','tree','log','wall','meat','helmet','fur'];
        for (let i = 0; i < 10000; i++)
        {
            const item = this.add.image(
                Math.floor(Math.random() * 1000) * 64,
                Math.floor(Math.random() * 1000) * 64,
                items[Math.floor(Math.random() * items.length)]
            );
            item.setOrigin(0.5);
            item.setScale(Math.min(64/item.width, 64/item.height));
        }

        const cursors = this.input.keyboard.createCursorKeys();
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        });

        const help = this.add.text(16, 16, 'Arrows to scroll', {
            fontSize: '18px',
            padding: { x: 10, y: 5 },
            backgroundColor: '#000000'
        });
        help.setFill('#ffffff');
        help.setScrollFactor(0);
    }

    update (time: number, delta: number): void
    {
        this.controls.update(delta);
    }
}
