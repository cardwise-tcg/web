
import { createContext, useEffect, useState } from 'react';

export const QuizSettingsContext = createContext(null);

const QUIZ_SETTINGS_KEY = 'quizSettings';

const QuizSettingsProvider = ({ children }) => {
    const [fields, setFields] = useState(null);
    const [source, setSource] = useState(null);

    useEffect(() => {
        const quizSettings = JSON.parse(localStorage.getItem(QUIZ_SETTINGS_KEY));
        if (quizSettings?.fields && quizSettings?.source) {
            setFields(quizSettings.fields);
            setSource(quizSettings.source);
        } else {
            setFields(false);
            setSource(false);
        }
    }, []);

    const setSelectedFields = (fields) => {
        const quizSettings = JSON.parse(localStorage.getItem(QUIZ_SETTINGS_KEY));
        localStorage.setItem(QUIZ_SETTINGS_KEY, JSON.stringify({ fields, ...quizSettings }));
        setFields(fields);
    };

    const setSelectedSource = (source) => {
        const quizSettings = JSON.parse(localStorage.getItem(QUIZ_SETTINGS_KEY));
        localStorage.setItem(QUIZ_SETTINGS_KEY, JSON.stringify({ source, ...quizSettings }));
        setSource(source);
    };

    return (
        <QuizSettingsContext.Provider value={{ fields, source, setSelectedSource, setSelectedFields }}>
            {children}
        </QuizSettingsContext.Provider>
    );
}
export default QuizSettingsProvider;
