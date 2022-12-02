import BitmapFontManager from './BitmapFontManager';

const colors = [
    '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#42d4f4', '#f032e6', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#000075', '#a9a9a9'
];

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
        const text = `Плајер${
            10000 + Math.round(Math.random()*90000)
        }`;

        const fontText = scene.add.text(data.x, data.y, text, {
            fontFamily: 'Arial',
            color: '#f0f',
            align: 'center'
        });
        fontText.setFontStyle('bold');
        fontText.setFontSize(12);
        fontText.setOrigin(0.5);

        /*const bitmapText = scene.add.bitmapText(
            data.x, data.y + 14,
            'ArialBold', text
        );
        bitmapText.setCenterAlign();
        bitmapText.setFontSize(16);
        bitmapText.setOrigin(0.5);*/

        const bitmapTextNew = scene.add.bitmapText(
            data.x, data.y,
            BitmapFontManager.font(scene,
                'Arial', true, false,
                colors[Math.floor(Math.random()*colors.length)]
            )
        );
        bitmapTextNew.setText(BitmapFontManager.sanitize(
            bitmapTextNew.fontData, text
        ));
        bitmapTextNew.setCenterAlign();
        bitmapTextNew.setFontSize(12);
        bitmapTextNew.setOrigin(0.5);
        bitmapTextNew.letterSpacing = -0.8;

        /*if(scene.renderer.type === Phaser.CANVAS)
        {
            bitmapTextNew.visible = false;

            const rt = scene.add.renderTexture(
                data.x, data.y,
                bitmapTextNew.width, bitmapTextNew.height
            );
            rt.setOrigin(0.5);

            rt.draw(bitmapTextNew, bitmapTextNew.width/2, bitmapTextNew.height/2);
        }*/
    }
}
