import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleButton from 'react-toggle-button';
import config from '../../config/games';
import styles from './Setup.module.css';
import { SelectedGameContext } from '../../contexts/SelectedGameContext';
import { QuizSettingsContext, SOURCE_TYPE_DECK, SOURCE_TYPE_SET } from '../../contexts/QuizSettingsContext';
import ProgressBar from '../../components/ProgressBar';
import Preview from '../../components/Preview';
import Button from '../../components/Button';


const Setup = () => {
    const navigate = useNavigate();
    const { game } = useContext(SelectedGameContext);
    const { setQuizSettings } = useContext(QuizSettingsContext);
    const [settings, setSettings] = useState(null);
    const [fields, setFields] = useState(null);
    const [sourceType, setSourceType] = useState('');
    const [cards, setCards] = useState('');
    const [cardSet, setCardSet] = useState('');
    const [maxNumberOfQuestions, setMaxNumberOfQuestions] = useState(10);
    const [questionType, setQuestionType] = useState('multiple');

    useEffect(() => {
        if (game === null) {
            return;
        }

        if (game === false) {
            navigate('/games');

        }
        setSettings(config[game])
    }, [navigate, game]);

    useEffect(() => {
        if (!settings || !settings.fields) {
            return;
        }

        setFields(
            settings.fields.map(field => {
                return {
                    ...field,
                    checked: false
                }
            })
        );
    }, [settings, settings?.fields]);

    const handleFieldChange = (value, key) => {
        setFields(
            fields.map(field => {
                if (field.key === key) {
                    field.checked = value;
                }
                return field;
            })
        );
    }

    const handleButtonClicked = () => {
        if (fields?.filter(field => field.checked).length === 0) {
            alert('Please select at least one field.')
            return;
        }

        if (sourceType.trim() === '') {
            alert('Please select a source of cards.');
            return;
        }

        setQuizSettings({
            fields: fields.filter(field => field.checked),
            source: sourceType === SOURCE_TYPE_SET ? cardSet : cards,
            maxNumberOfQuestions,
            questionType,
            sourceType,
        });

        navigate('/quiz');
    }


    if (!settings || !fields) {
        return <ProgressBar/>;
    }

    return (
        <div className={styles.pageSetup}>
            <h2>
                {settings.name} &raquo; Setup Quiz
            </h2>
            <div className={styles.twoColumns}>
                <div className={styles.column}>
                    <div className={styles.preview}>
                        <h3>
                            Preview
                        </h3>
                        <Preview
                            game={game}
                            image={settings.preview}
                            hide={fields.filter(field => field.checked).map(field => field.key)}
                            types={['Character']}
                        />
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.fields}>
                        <h3>
                            Fields
                        </h3>
                        {fields.map((field) => (
                            <div key={field.key} className={styles.field}>
                                <label htmlFor={field.key}>{field.name}</label>
                                <ToggleButton
                                    activeLabel={''}
                                    inactiveLabel={''}
                                    value={field.checked}
                                    onToggle={(value) => handleFieldChange(!value, field.key)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.twoColumns}>
                <div className={styles.column}>
                    <div className={styles.cardsContainer}>
                        <h3>
                            Cards
                        </h3>
                        <select
                            className={styles.sourceSelect}
                            name="source"
                            id="source"
                            onChange={(e) => setSourceType(e.target.value)}
                        >
                            <option>Select source</option>
                            <option value={SOURCE_TYPE_SET}>Official Set</option>
                            <option value={SOURCE_TYPE_DECK}>Deck List</option>
                        </select>
                        {
                            sourceType === SOURCE_TYPE_SET && (
                                settings.sets.map((set) => (
                                    <div key={set.key} className={styles.setRadio}>
                                        <label htmlFor={set.key}>{set.name}</label>
                                        <input type="radio" name="set" id={set.key} value={set.key}
                                               onChange={(e) => setCardSet(e.target.value)}/>
                                    </div>
                                ))
                            )
                        }
                        {
                            sourceType === SOURCE_TYPE_DECK && (
                                <textarea
                                    placeholder="Supports dreamborn.ink exported deck lists..."
                                    className={styles.cardsTextarea}
                                    value={cards}
                                    onChange={(e) => setCards(e.target.value)}
                                />
                            )
                        }
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.cardsContainer}>
                        <h3>
                            Settings
                        </h3>
                        <div className={styles.setting}>
                            <label htmlFor="max-number-of-questions">
                                Max. number of questions:
                                <strong>{maxNumberOfQuestions}</strong>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="30"
                                value={maxNumberOfQuestions}
                                onChange={e => setMaxNumberOfQuestions(e.target.value)} className="slider"
                                id="max-number-of-questions"
                                disabled
                            />
                            <small><em>disabled: work in progress</em></small>
                        </div>
                        <span><em><small>more settings to come...</small></em></span>
                    </div>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <Button containerStyle={styles.generateBtn} onClick={handleButtonClicked}>
                    Generate
                </Button>
            </div>
        </div>
    );
};

export default Setup;

