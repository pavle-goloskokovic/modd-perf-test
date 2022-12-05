import { AttributeData } from './AttributeBar';

export default class TextureAttributeBar extends Phaser.GameObjects.Container {

    private readonly images: Phaser.GameObjects.Image[] = [];

    constructor (scene: Phaser.Scene, x: number, y: number, data: AttributeData)
    {
        super(scene, x, y);

        const stroke = scene.add.image(0, 0, 'stroke');
        stroke.setOrigin(0.5);

        const filLeft = scene.add.image(
            -stroke.width / 2,
            0,
            'fill-side'
        );
        filLeft.setOrigin(0, 0.5);
        filLeft.visible = false;

        const fill = scene.add.image(
            filLeft.x + filLeft.width - 1,
            0,
            'fill'
        );
        fill.setOrigin(0, 0.5);
        fill.setScale(1, filLeft.height);
        fill.visible = false;

        const fillRight = scene.add.image(
            fill.x + fill.displayWidth - 1,
            0,
            'fill-side'
        );
        fillRight.setOrigin(0, 0.5);
        fillRight.flipX = true;
        fillRight.visible = false;

        this.images.push(filLeft, fill, fillRight, stroke);
        this.add(this.images);

        this.render(data);

        scene.add.existing(this);
    }

    render ({ color, value, max }: AttributeData): void
    {
        const images = this.images;
        const fillLeft = images[0];
        const fill = images[1];
        const fillRight = images[2];
        const stroke = images[3];

        // TODO update fill textures based on color
        /*bar.fillStyle(Phaser.Display.Color
            .HexStringToColor(color)
            .color);*/

        if (value !== 0)
        {
            const w = stroke.width - 2*fillLeft.width + 2;
            fill.scaleX = w * value / max;
            fillRight.x = fill.x + fill.displayWidth - 1;

            fillLeft.visible =
                fill.visible =
                    fillRight.visible = true;
        }
        else
        {
            fillLeft.visible =
                fill.visible =
                    fillRight.visible = false;
        }
    }
}
