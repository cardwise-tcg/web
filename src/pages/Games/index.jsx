import styles from './Games.module.css';

import lorcana from '../../assets/lorcana.png';
import pokemon from '../../assets/pokemon.png';
import swu from '../../assets/swu.webp';

import Button from "../../components/Button";
import { SelectedGameContext } from "../../contexts/SelectedGameContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Games = () => {
    const navigate = useNavigate();
    const { setSelectedGame } = useContext(SelectedGameContext);

    const handleGameClicked = (game) => {
        setSelectedGame(game);
        navigate('/setup');
    };

    return (
        <div className={styles.pageGames}>
            <h2>
                Available
            </h2>
            <div className={styles.gamesList}>
                <div className={styles.game}>
                    <Button onClick={() => handleGameClicked('lorcana')}>
                        <img src={lorcana} alt="Lorcana"/>
                    </Button>
                </div>
            </div>
            <h2>
                Coming soon...
            </h2>
            <div className={styles.gamesList}>
                <div className={styles.game}>
                    <Button onClick={() => handleGameClicked('pokemon')}>
                        <img src={pokemon} alt="Pokemon"/>
                    </Button>
                </div>
                <div className={styles.game}>
                    <Button onClick={() => handleGameClicked('star-wars-unlimited')}>
                        <img src={swu} alt="Star Wars: Unlimited"/>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Games;
