import styles from './Quiz.module.css';
import { useContext } from 'react';
import { SelectedGameContext } from '../../contexts/SelectedGameContext';
import { QuizSettingsContext } from "../../contexts/QuizSettingsContext";

const Quiz = () => {
    const { game } = useContext(SelectedGameContext);
    const { fields, source } = useContext(QuizSettingsContext);

    console.log(
        game,
        fields,
        source
    );

    return (
        <div className={styles.pageQuiz}>
            <h1>Quiz</h1>
            <p>
                Work in progress...
            </p>
        </div>
    )
}

export default Quiz;
