import styles from './Quiz.module.css';
import { useContext, useEffect, useState } from 'react';
import { SelectedGameContext } from '../../contexts/SelectedGameContext';
import { areSettingsValid, QuizSettingsContext, SOURCE_TYPE_SET } from '../../contexts/QuizSettingsContext';
import { useNavigate } from 'react-router-dom';
import config from '../../config/games';
import ProgressBar from '../../components/ProgressBar';
import Preview from '../../components/Preview';

const Quiz = () => {
    const navigate = useNavigate();
    const { game } = useContext(SelectedGameContext);
    const { quizSettings } = useContext(QuizSettingsContext);
    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (game === null) {
            return;
        }

        if (areSettingsValid(quizSettings) === false) {
            navigate('/games');
            return;
        }

        if (quizSettings.sourceType === SOURCE_TYPE_SET) {
            if (!config[game].sets.filter(set => quizSettings.source === set.key).length) {
                navigate('/setup');
                return;
            }
        }

        let params = ``;

        if (quizSettings.sourceType === SOURCE_TYPE_SET) {
            params = `set_key=${quizSettings.source}`;
        } else {
            const list = quizSettings.source
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

    }, [quizSettings, game, navigate]);

    const randomCard = cards[Math.floor(Math.random() * cards.length)];

    return (
        <div className={styles.pageQuiz}>
            <h1>Quiz</h1>
            {
                isLoading ? (
                    <ProgressBar/>
                ) : (
                    <Preview
                        image={`${config[game].cdn.cards}/${randomCard.set.key}/${randomCard.number}-md.png`}
                        game={game}
                        hide={quizSettings.fields.filter(field => field.checked).map(field => field.key)}
                    />
                )
            }

        </div>
    )
}

export default Quiz;
