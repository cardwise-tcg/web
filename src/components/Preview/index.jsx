import styles from './Preview.module.css';
import Pokemon from './Pokemon';
import Lorcana from './Lorcana';

const Preview = ({ image, game, hide }) => {

    let component = null;

    if (game === 'pokemon') {
        component = <Pokemon
            image={image}
            hide={hide}
        />;
    }

    if (game === 'lorcana') {
        component = <Lorcana
            image={image}
            hide={hide}
        />;
    }

    return (
        <div className={styles.cardPreview}>
            {component}
        </div>
    )
}

export default Preview;
