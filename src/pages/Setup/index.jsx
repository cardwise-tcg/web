import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '../../config/games';
import styles from './Setup.module.css';
import { SelectedGameContext } from '../../contexts/SelectedGameContext';
import { QuizSettingsContext } from '../../contexts/QuizSettingsContext';
import ProgressBar from '../../components/ProgressBar';
import Preview from '../../components/Preview';
import Button from '../../components/Button';


const Setup = () => {
    const navigate = useNavigate();
    const { game } = useContext(SelectedGameContext);
    const { setSelectedFields, setSelectedSource } = useContext(QuizSettingsContext);
    const [settings, setSettings] = useState(null);
    const [fields, setFields] = useState(null);
    const [source, setSource] = useState('');

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

    const handleFieldChange = (event, key) => {
        setFields(
            fields.map(field => {
                if (field.key === key) {
                    field.checked = event.target.checked;
                }
                return field;
            })
        );
    }

    const handleButtonClicked = () => {
        if (fields?.filter(field => field.checked).length === 0) {
            return;
        }

        if (source.trim() === '') {
            return;
        }

        setSelectedFields(fields);
        setSelectedSource(source);
        navigate('/quiz');
    }


    if (!settings || !fields) {
        return <ProgressBar/>;
    }

    return (
        <div className={styles.pageSetup}>
            <h2>
                {settings.name} &raquo; Setup
            </h2>
            <p className={styles.description}>
                Toggle the fields you want to include in your flashcards. Use the preview to see how your
                flashcards will look like. You can either type the name of a released Pokemon set or paste a deck URL.
            </p>
            <div className={styles.previewContainer}>
                <div className={styles.preview}>
                    <Preview
                        game={game}
                        image={settings.preview}
                        hide={fields.filter(field => field.checked).map(field => field.key)}
                    />
                </div>
                <div className={styles.fields}>
                    <input
                        type="text"
                        placeholder="Set name / Deck URL"
                        className={styles.search}
                        onChange={(event) => setSource(event.target.value)}
                    />
                    {fields.map((field) => (
                        <div key={field.key} className={styles.field}>
                            <label htmlFor={field.key}>{field.name}</label>
                            <input
                                type="checkbox"
                                id={field.key}
                                name={field.key}
                                checked={field.checked}
                                onChange={(e) => handleFieldChange(e, field.key)}
                            />
                        </div>
                    ))}

                    <Button containerStyle={styles.generateBtn} onClick={handleButtonClicked}>
                        Generate
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Setup;

