export default class TestTextArial {

    constructor (
        scene: Phaser.Scene,
        data: {
			// text: string;
			x: number;
			y: number;
			// color: string;
		},
    )
    {
        const text = `player${
            10000 + Math.round(Math.random()*90000)
        }`;

        const fontText = scene.add.text(data.x, data.y, text, {
            fontFamily: 'Arial',
            color: '#f0f',
            align: 'center'
        });
        fontText.setFontStyle('bold');
        fontText.setFontSize(14);
        fontText.setOrigin(0.5);

        const bitmapText = scene.add.bitmapText(
            data.x, data.y + 14,
            'ArialBold', text
        );
        bitmapText.setCenterAlign();
        bitmapText.setFontSize(16);
        bitmapText.setOrigin(0.5);

        const bitmapTextNew = scene.add.bitmapText(
            data.x, data.y + 28,
            'ArialBoldNew', text
        );
        bitmapTextNew.setCenterAlign();
        bitmapTextNew.setFontSize(14);
        bitmapTextNew.setOrigin(0.5);
        bitmapTextNew.letterSpacing = -0.8;
    }
}
