import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Lorcana.module.css';
import lorcana from '../../config/games/lorcana';

const Lorcana = ({ image, types, hide }) => {
    const canvasRef = useRef(null);
    const cardImageRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        canvas.width = lorcana.canvas.CARD_WIDTH;
        canvas.height = lorcana.canvas.CARD_HEIGHT;

    }, [cardImageRef, canvasRef, image]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        cardImageRef.current = new Image(lorcana.canvas.CARD_WIDTH, lorcana.canvas.CARD_HEIGHT);
        cardImageRef.current.src = image;

        cardImageRef.current.onload = () => {
            context.drawImage(
                cardImageRef.current,
                0,
                0,
                lorcana.canvas.CARD_WIDTH,
                lorcana.canvas.CARD_HEIGHT
            );

            if (hide.includes('ink')) {
                lorcana.canvas.hideInk(context);
            }

            if (hide.includes('lore') && types.includes('Character')) {
                lorcana.canvas.hideLore(context);
            }

            if (hide.includes('cost')) {
                lorcana.canvas.hideCost(context);
            }

            if (hide.includes('strength') && types.includes('Character')) {
                lorcana.canvas.hideStrength(context);
            }

            if (hide.includes('willpower') && types.includes('Character')) {
                lorcana.canvas.hideWillpower(context);
            }

            if (hide.includes('inkable')) {
                lorcana.canvas.hideInkable(context);
            }

            if (hide.includes('rarity')) {
                lorcana.canvas.hideRarity(context);
            }

            if (hide.includes('classifications')) {
                lorcana.canvas.hideClassifications(context);
            }

            if (hide.includes('text')) {
                lorcana.canvas.hideText(context);
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
