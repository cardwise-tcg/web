import styles from './Quiz.module.css';
import { useContext, useEffect, useState } from 'react';
import { SelectedGameContext } from '../../contexts/SelectedGameContext';
import { QuizSettingsContext } from "../../contexts/QuizSettingsContext";
import { useNavigate } from 'react-router-dom';
import config from '../../config/games';
import ProgressBar from '../../components/ProgressBar';
import Preview from '../../components/Preview';

const Quiz = () => {
    const navigate = useNavigate();
    const { game } = useContext(SelectedGameContext);
    const { fields, source } = useContext(QuizSettingsContext);
    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState([]);


    useEffect(() => {
        if(game === null || fields === null || source === null) {
            return;
        }

        if (game === false) {
            navigate('/games');
            return;
        }

        if (fields === false || source === false) {
            navigate('/setup');
            return;
        }

        let params = ``;

        // Is it a set?
        if(config[game].sets.filter(set => source === set.key).length > 0) {
            params = `set_key=${source}`;
        } else {
            // or is it a deck list?
            const list = source
                .split('\n')
                .map(line => `name=${line.substring(2)}`);
            params = list.join('&')
        }

        fetch(`${config[game].api.cards}?` + params)
            .then(response => response.json())
            .then(data => {
                setCards(data.cards);
                setIsLoading(false);
            });

    }, [fields, source, game, navigate]);

    const randomCard = cards[Math.floor(Math.random() * cards.length)];

    return (
        <div className={styles.pageQuiz}>
            <h1>Quiz</h1>
            {
                isLoading ? (
                    <ProgressBar />
                ) : (
                    <div className={styles.cardPreview}>
                        <Preview
                            image={`${config[game].cdn.cards}/${randomCard.set.key}/${randomCard.number}-md.png`}
                            game={game}
                            hide={fields.filter(field => field.checked).map(field => field.key)}
                        />
                    </div>
                )
            }

        </div>
    )
}

export default Quiz;
