import SteeringEntity from './SteeringEntity';

export default class Pig extends SteeringEntity {

    constructor (scene: Phaser.Scene, x: number, y: number)
    {
        super();

        const e = this.entity = scene.add.image(x, y, 'pig');
        e.setOrigin(0.5);
        // e.setScale(Math.min(64/e.width, 64/e.height));
        e.setScale(0.55);
    }
}
