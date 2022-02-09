import SteeringEntity from './SteeringEntity';

export default class Player extends SteeringEntity {

    // label: Phaser.GameObjects.Text;
    label: Phaser.GameObjects.BitmapText;

    constructor (scene: Phaser.Scene, x: number, y: number)
    {
        super();

        const e = this.entity = scene.add.container(x, y);

        const player = scene.add.image(0, 0, 'human');
        player.setOrigin(0.5);
        player.setScale(Math.min(64/player.width, 64/player.height));
        e.add(player);

        const axe = scene.add.image(0, 0, 'axe');
        player.setOrigin(0.5);
        e.add(axe);

        /*this.label = scene.add.text(x, y, `player${
            10000 + Math.round(Math.random()*90000)
        }`, {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 6
        });
        this.label.setOrigin(0.5);*/

        this.label = scene.add.bitmapText(x, y, 'font', `player${
            10000 + Math.round(Math.random()*90000)
        }`, 28, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        this.label.setOrigin(0.5);
    }

    update (time: number, delta: number): void
    {
        super.update(time, delta);

        this.label.x = this.entity.x;
        this.label.y = this.entity.y - 50;
    }
}
