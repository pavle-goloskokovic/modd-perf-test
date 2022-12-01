interface AttributeData {
    color: string;
    max: number;
    value: number;
}

export default class AttributeBar extends Phaser.GameObjects.Container {

    private readonly bar: Phaser.GameObjects.Graphics;

    private constructor (scene: Phaser.Scene, x: number, y: number, data: AttributeData)
    {
        super(scene, x, y);

        const bar = this.bar = scene.add.graphics();
        this.add(bar);

        this.render(data);
    }

    render ({ color, value, max }: AttributeData): void
    {
        const bar = this.bar;

        const w = 94;
        const h = 16;
        const borderRadius = h / 2 - 1;

        bar.clear();

        bar.fillStyle(Phaser.Display.Color
            .HexStringToColor(color)
            .color);

        if (value !== 0)
        {
            bar.fillRoundedRect(
                -w / 2,
                -h / 2,
                Math.max(w * value / max, borderRadius * 1.5),
                h,
                borderRadius
            );
        }

        bar.lineStyle(2, 0x000000, 1);
        bar.strokeRoundedRect(
            -w / 2,
            -h / 2,
            w,
            h,
            borderRadius
        );
    }
}
