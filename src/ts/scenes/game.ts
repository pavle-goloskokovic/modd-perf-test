import * as logger from 'js-logger';
import Pig from '../classes/Pig';
import Bear from '../classes/Bear';
import Player from '../classes/Player';
import TestText from '../classes/TestText';
import AttributeBar from '../classes/AttributeBar';
import TextureAttributeBar from '../classes/TextureAttributeBar';

const TILEMAP_SIZE = 200;
const TILE_SIZE = 64;
const STATIC_ENTITIES_SIZE = 15000;
const ACTIVE_ENTITIES_SIZE = 100;
const TEXTS_SIZE = 4/*1000*/;
const ATTRIBUTE_BARS_SIZE = 50;

/**
 * Game Phaser scene.
 *
 * This is where all the logic for your game goes.
 */
export default class Game extends Phaser.Scene {
  controls: Phaser.Cameras.Controls.FixedKeyControl;

  animals: (Pig | Bear)[] = [];
  players: Player[] = [];

  create (): void
  {
      logger.info('Game enter');

      this.cameras.main.setZoom(7 / 11);

      /*const map = this.make.tilemap({
          width: TILEMAP_SIZE,
          height: TILEMAP_SIZE,
          tileWidth: TILE_SIZE,
          tileHeight: TILE_SIZE
      });

      const tiles = map.addTilesetImage('tilesheet_complete', null, TILE_SIZE, TILE_SIZE);

      const indexes: number[] = [];
      for (let i = -1; i < 540; i++)
      {
          indexes.push(i);
      }
      ['floor', 'floor2', 'debris', 'walls', 'trees'].forEach(layerName =>
      {
          const layer = map.createBlankLayer(layerName, tiles);
          layer.randomize(0, 0, map.width, map.height, indexes);

      /!*console.log(layer);
            console.log(layer.layer);*!/
      });*/

      /*const items = ['blood', 'rocks', 'tree', 'log', 'wall', 'meat', 'helmet', 'fur'];
      for (let i = 0; i < STATIC_ENTITIES_SIZE; i++)
      {
          const item = this.add.image(
              Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE,
              Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE,
              items[Math.floor(Math.random() * items.length)]
          );
          item.setOrigin(0.5);
          item.setScale(Math.min(TILE_SIZE / item.width, TILE_SIZE / item.height));
      }

      for (let i = 0; i < ACTIVE_ENTITIES_SIZE; i++)
      {
          this.animals.push(
              new (Math.random() < 0.5 ? Pig : Bear)(
                  this,
                  Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE,
                  Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE
              )
          );
      }*/

      const player = new Player(this,
          Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE,
          Math.floor(Math.random() * TILEMAP_SIZE) * TILE_SIZE
      );

      this.players.push(player);
      this.cameras.main.startFollow(player.entity);

      /*for (let i = 0; i < TEXTS_SIZE; i++)
      {
          new TestText(this,{
              x: player.entity.x +
                  Math.round((Math.random()-0.5) * this.scale.width
                      / this.cameras.main.zoom),
              y: player.entity.y +
                  Math.round((Math.random()-0.5) * this.scale.height
                      / this.cameras.main.zoom)
          });
      }*/

      for (let i = 0; i < ATTRIBUTE_BARS_SIZE; i++)
      {
          new TextureAttributeBar(this,
              player.entity.x +
                  Math.round((Math.random()-0.5) * this.scale.width
                      / this.cameras.main.zoom),
              player.entity.y +
                  Math.round((Math.random()-0.5) * this.scale.height
                      / this.cameras.main.zoom),
              {
                  color: '#FFFFFF',
                  value: Math.random()*100,
                  max: 100
              }
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

  update (time: number, delta: number): void
  {
      // this.controls.update(delta);

      this.animals.forEach(a =>
      {
          a.update(time, delta);
      });

      this.players.forEach(a =>
      {
          a.update(time, delta);
      });
  }
}
