export default class TestText {

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

        const fontText = scene.add.text(
            data.x, data.y, text,
            { fontFamily: 'Verdana' }
        );
        fontText.setOrigin(0.5);
        fontText.setFontSize(16);
        fontText.setFontStyle('bold');
        fontText.setFill('#f0f' || '#fff');
        fontText.setStroke('#0f0', 0);

        const bitmapText = scene.add.bitmapText(
            data.x, data.y,
            'VerdanaBold', text, 16
        );
        bitmapText.setOrigin(0.5);
        bitmapText.letterSpacing = 1.5;
        // bitmapText.alpha = 0.5;
    }
}
