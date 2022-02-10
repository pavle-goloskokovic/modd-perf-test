import * as logger from 'js-logger';
import Pig from '../classes/Pig';
import Bear from '../classes/Bear';
import Player from '../classes/Player';

const TILEMAP_SIZE = 200;
const TILE_SIZE = 64;
const STATIC_ENTITIES_SIZE = 15000;
const ACTIVE_ENTITIES_SIZE = 100;

/**
 * Game Phaser scene.
 *
 * This is where all the logic for your game goes.
 */
export default class Game extends Phaser.Scene {
  controls: Phaser.Cameras.Controls.FixedKeyControl;

  animals: (Pig | Bear)[] = [];
  players: Player[] = [];

  create(): void {
    logger.info('Game enter');

    this.cameras.main.setZoom(5 / 11);

    const map = this.make.tilemap({
      width: TILEMAP_SIZE,
      height: TILEMAP_SIZE,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE
    });

    const tiles = map.addTilesetImage('tilesheet_complete', null, TILE_SIZE, TILE_SIZE);

    const indexes: number[] = [];
    for (let i = -1; i < 540; i++) {
      indexes.push(i);
    }
    ['floor', 'floor2', 'debris', 'walls', 'trees'].forEach(layerName => {
      const layer = map.createBlankLayer(layerName, tiles);
      layer.randomize(0, 0, map.width, map.height, indexes);

      /*console.log(layer);
            console.log(layer.layer);*/
    });

    const items = ['blood', 'rocks', 'tree', 'log', 'wall', 'meat', 'helmet', 'fur'];
    this.players.push(
      new Player(this, Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE, Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE)
    );
    this.cameras.main.startFollow(this.players[0].entity);

    for (let i = 0; i < STATIC_ENTITIES_SIZE; i++) {
      const item = this.add.image(
        Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE,
        Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE,
        items[Math.floor(Math.random() * items.length)]
      );
      item.setOrigin(0.5);
      item.setScale(Math.min(TILE_SIZE / item.width, TILE_SIZE / item.height));
    }

    for (let i = 0; i < ACTIVE_ENTITIES_SIZE; i++) {
      this.animals.push(
        new (Math.random() < 0.5 ? Pig : Bear)(
          this,
          Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE,
          Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE
        )
      );
    }

    /* this.players.push(
                new Player(
                    this,
                    Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE,
                    Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE
                )
            ); */

    /*const cursors = this.input.keyboard.createCursorKeys();
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
        help.setScrollFactor(0);*/
  }

  update(time: number, delta: number): void {
    // this.controls.update(delta);

    this.animals.forEach(a => {
      a.update(time, delta);
    });

    this.players.forEach(a => {
      a.update(time, delta);
    });
  }
}
