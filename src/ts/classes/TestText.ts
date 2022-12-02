import BitmapFontManager from './BitmapFontManager';

const colors = [
    '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#42d4f4', '#f032e6', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#000075', '#a9a9a9'
];

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
        const text = /*`player*/`Плајер${
            10000 + Math.round(Math.random()*90000)
        }`;

        const fontText = scene.add.text(
            data.x, data.y, text,
            { fontFamily: 'Verdana' }
        );
        fontText.setOrigin(0.5);
        fontText.setFontSize(16);
        // fontText.setFontStyle('bold');
        fontText.setFill('#f0f');
        fontText.setStroke('#0f0', 4);

        const bitmapText = scene.add.bitmapText(
            data.x, data.y,
            BitmapFontManager.font(scene,
                'Verdana', !true, true,
                colors[Math.floor(Math.random()*colors.length)]
            )
        );
        bitmapText.setText(BitmapFontManager.sanitize(
            bitmapText.fontData, text
        ));
        bitmapText.setFontSize(16);
        bitmapText.setOrigin(0.5);
        bitmapText.letterSpacing = /*-3.5 ||*/ 1.3; // TODO proper letter spacing based on weight
        // bitmapText.alpha = 0.5;

        if(scene.renderer.type === Phaser.CANVAS)
        {
            bitmapText.visible = false;

            const rt = scene.add.renderTexture(
                data.x, data.y,
                bitmapText.width, bitmapText.height
            );
            rt.setOrigin(0.5);

            rt.draw(bitmapText, bitmapText.width/2, bitmapText.height/2);
        }
    }
}
