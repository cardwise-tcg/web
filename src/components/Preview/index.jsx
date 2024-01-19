import styles from './Preview.module.css';
import Pokemon from "./Pokemon";

const Preview = ({ image, game, hide }) => {

    let component = null;

    if (game === 'pokemon') {
        component = <Pokemon
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
