import styles from './Lorcana.module.css';
import { ucfirst } from "../../utilities/strings";

const Lorcana = ({ image, hide }) => {

    console.log(hide);
    return (
        <div className={styles.lorcana}>
            <img src={image} alt="Preview" className={hide.includes('ink') ? styles.hideInk : ``}/>
            {
                hide.map(item => {
                    return <div key={item} className={styles[`hide${ucfirst(item)}`]}/>;
                })
            }
        </div>
    )
}

export default Lorcana;
