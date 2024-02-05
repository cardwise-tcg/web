import styles from './Pokemon.module.css';
import { ucfirst } from '../../utilities/strings';

const Pokemon = ({ image, hide }) => {

    return (
        <div className={styles.pokemon}>
            {
                hide
                    .map(item => <div key={item} className={styles[`hide${ucfirst(item)}`]}/>)
            }
            <img src={image} alt="Preview"/>
        </div>
    )
}

export default Pokemon;
