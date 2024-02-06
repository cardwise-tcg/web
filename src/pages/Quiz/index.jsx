import styles from './Quiz.module.css';
import { useContext, useEffect, useState } from 'react';
import { SelectedGameContext } from '../../contexts/SelectedGameContext';
import { areSettingsValid, QuizSettingsContext, SOURCE_TYPE_SET } from '../../contexts/QuizSettingsContext';
import { useNavigate } from 'react-router-dom';
import config from '../../config/games';
import ProgressBar from '../../components/ProgressBar';
import Preview from '../../components/Preview';
import Button from '../../components/Button';
import Confetti from 'react-dom-confetti';

const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
};

const Quiz = () => {
    const navigate = useNavigate();
    const { game } = useContext(SelectedGameContext);
    const { quizSettings } = useContext(QuizSettingsContext);
    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

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
                .map(line => `name=${line.substring(2).trim()}`);
            params = list.join('&')
        }

        fetch(`${config[game].api.cards}?` + params)
            .then(response => response.json())
            .then(data => {
                setCards(data.cards);
            })
            .catch(e => console.error(e))
            .finally(() => {
                setIsLoading(false);
            });

    }, [quizSettings, game, navigate]);

    useEffect(() => {
        if (cards.length === 0) {
            return;
        }

        const questions = config[game].questions.generate(
            quizSettings.maxNumberOfQuestions,
            cards,
            quizSettings.fields.filter(field => field.checked),
        );
        setQuestions(questions);
    }, [cards]);

    useEffect(() => {
        let confettiTimeout;
        if (currentQuestion === questions.length) {
            confettiTimeout = setTimeout(() => {
                setShowConfetti(true);
            }, 400);
        }

        return () => {
            clearTimeout(confettiTimeout);
        }
    }, [currentQuestion, questions]);

    const nextQuestion = () => {
        if (!isAnswered) {
            alert('Questions cannot be skipped :(');
            return;
        }

        setCurrentQuestion(currentQuestion + 1);
        setIsAnswered(false);
    };

    const chooseOption = (option) => {
        if (isAnswered) {
            return;
        }

        if (option === questions[currentQuestion].answer) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setIncorrectAnswers(incorrectAnswers + 1);
        }

        setIsAnswered(true);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setIsAnswered(false);
        setShowConfetti(false);
    };

    const question = questions[currentQuestion];

    return (
        <div className={styles.pageQuiz}>
            <h1>Quiz</h1>
            {
                isLoading ? (
                    <ProgressBar/>
                ) : (
                    question ? (
                        <div>
                            <Preview
                                image={`${config[game].cdn.cards}/${question.card.set.key}/${question.card.number}-md.png`}
                                game={game}
                                hide={[question.field.key]}
                                types={question.card.types}
                            />

                            <div className={styles.questionContainer}>
                                <p className={styles.questionText}>
                                    {question.text}
                                </p>
                                <div className={styles.optionsContainer}>
                                    {question.options.map(option => (
                                        <div className={styles.option} key={option}>
                                            {isAnswered && option === question.answer && (<span>✓</span>)}
                                            <Button
                                                disabled={isAnswered && option !== question.answer}
                                                containerStyle={styles.optionButton}
                                                onClick={() => chooseOption(option)}
                                            >
                                                {option}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.progress}>
                                <div>
                                    {currentQuestion + 1} out of {questions.length}
                                </div>
                                <button onClick={nextQuestion} className={styles.nextButton} disabled={!isAnswered}>
                                    {currentQuestion + 1 === questions.length ? 'Finish' : 'Next'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        questions.length === 0 ? (
                            <p>No questions generated.</p>
                        ) : (
                            <>
                                <p>Your results are ready!</p>
                                <Confetti active={showConfetti} config={confettiConfig}/>

                                <div className={styles.resultContainer}>
                                    <div className={styles.result}>
                                        <div>Correct:</div>
                                        <div>{correctAnswers}</div>
                                    </div>
                                    <div className={styles.result}>
                                        <div>Incorrect:</div>
                                        <div>{incorrectAnswers}</div>
                                    </div>
                                    <div className={styles.resultActions}>
                                        <a href="/Setup">New Quiz</a>
                                        <Button onClick={restartQuiz}>Retry</Button>
                                    </div>
                                </div>
                            </>
                        )
                    )
                )
            }
        </div>
    )
}

export default Quiz;
