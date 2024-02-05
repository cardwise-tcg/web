import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Lorcana.module.css';
import inkableOverlay from '../../assets/lorcana/inkable.svg';
import strengthOverlay from '../../assets/lorcana/willpower.svg';

const CARD_WIDTH = 330;
const CARD_HEIGHT = 450;

const _drawHexagon = (context, x, y, r) => {
    const b = Math.sqrt((3 * r * r) / 4);

    context.beginPath();
    context.moveTo(x + b, y);

    context.lineTo(x + 2 * b, y + r / 2);
    context.lineTo(x + 2 * b, y + r + (r / 2));
    context.lineTo(x + b, y + r + (r / 2) + (r / 2));
    context.lineTo(x, y + r + (r / 2));
    context.lineTo(x, y + r / 2);

    context.fill();
}

const hideInk = (context) => {
    const x = 16, y = (CARD_HEIGHT / 2) + 56, r = 12;
    _drawHexagon(context, x, y, r);

    let imageData = context.getImageData(0, 0, CARD_WIDTH, CARD_HEIGHT);
    let pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
        let lightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
        pixels[i] = lightness;
        pixels[i + 1] = lightness;
        pixels[i + 2] = lightness;
    }
    context.putImageData(imageData, 0, 0);
}

const hideLore = (context) => {
    const width = 32;
    const height = 110;

    context.beginPath();
    context.rect(
        CARD_WIDTH - (width + 13),
        CARD_HEIGHT - (height + 30),
        width,
        height,
    );
    context.fill();
};

const hideCost = (context) => {
    const x = 18, y = 17, r = 18;
    _drawHexagon(context, x, y, r);
};

const hideInkable = (context) => {
    const width = 56,
        height = 54;

    const overlay = new Image();
    overlay.src = inkableOverlay;

    overlay.onload = () => {
        context.drawImage(overlay, 5, 8, width, height);
    }
};

const hideStrength = (context) => {
    const radius = 16;

    context.beginPath();
    context.arc(
        CARD_WIDTH - (radius * 2 + 41),
        (CARD_HEIGHT / 2) + (radius * 2 + 5),
        radius,
        0,
        2 * Math.PI
    );
    context.fill();
};

const hideWillpower = (context) => {
    const width = 36,
        height = 40;

    const overlay = new Image();
    overlay.src = strengthOverlay;

    overlay.onload = () => {
        context.drawImage(
            overlay,
            CARD_WIDTH - (width + 16),
            (CARD_HEIGHT / 2) + (height / 2),
            width,
            height
        );
    }
};

const hideRarity = (context) => {
    const width = 36,
        height = 30;

    context.beginPath();
    context.rect(
        (CARD_WIDTH / 2) - (width / 2),
        CARD_HEIGHT - height,
        width,
        height
    );
    context.fill();
};

const hideClassifications = (context) => {
    const width = CARD_WIDTH - 90, height = 15;
    context.beginPath();
    context.roundRect(
        50,
        (CARD_HEIGHT / 2) + 60,
        width,
        height,
        Math.PI,
    );
    context.fill();
};

const hideText = (context) => {
    const width = CARD_WIDTH - 55, height = 110;
    context.beginPath();
    context.roundRect(
        13,
        (CARD_HEIGHT / 2) + 85,
        width,
        height,
        Math.PI,
    );
    // context.fillStyle = 'white';
    context.fill();
};

const Lorcana = ({ image, hide }) => {
    const canvasRef = useRef(null);
    const cardImageRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        canvas.width = CARD_WIDTH;
        canvas.height = CARD_HEIGHT;

    }, [cardImageRef, canvasRef, image]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        cardImageRef.current = new Image(CARD_WIDTH, CARD_HEIGHT);
        cardImageRef.current.src = image;

        cardImageRef.current.onload = () => {
            context.drawImage(cardImageRef.current, 0, 0, CARD_WIDTH, CARD_HEIGHT);

            if (hide.includes('ink')) {
                hideInk(context);
            }

            if (hide.includes('lore')) {
                hideLore(context);
            }

            if (hide.includes('cost')) {
                hideCost(context);
            }

            if (hide.includes('strength')) {
                hideStrength(context);
            }

            if (hide.includes('willpower')) {
                hideWillpower(context);
            }

            if (hide.includes('inkable')) {
                hideInkable(context);
            }

            if (hide.includes('rarity')) {
                hideRarity(context);
            }

            if (hide.includes('classifications')) {
                hideClassifications(context);
            }

            if (hide.includes('text')) {
                hideText(context);
            }
        }

    }, [hide, canvasRef, image]);

    return (
        <div className={styles.lorcana}>
            <canvas ref={canvasRef} className={styles.canvas}/>
        </div>
    )
}

Lorcana.propTypes = {
    image: PropTypes.string.isRequired,
    hide: PropTypes.array.isRequired
};

export default Lorcana;
