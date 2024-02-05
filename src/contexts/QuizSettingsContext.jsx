import { createContext, useEffect, useReducer } from 'react';

export const QuizSettingsContext = createContext(null);

const QUIZ_SETTINGS_KEY = 'quizSettings';

const ACTION_UPDATE_FIELDS = 'updateFields';
const ACTION_UPDATE_SOURCE = 'updateSource';
const ACTION_UPDATE = 'update';

export const QUESTION_TYPE_MULTIPLE = 'multiple';
export const QUESTION_TYPE_CLOSED = 'closed';
export const QUESTION_TYPE_MIXED = 'mixed';

export const SOURCE_TYPE_SET = 'set';
export const SOURCE_TYPE_DECK = 'deck';

const initialQuizSettings = {
    fields: null,
    source: null,
    sourceType: null,
    maxNumberOfQuestions: 10,
    questionType: 'multiple',
};

export const areSettingsValid = (quizSettings) => {
    if (!quizSettings) return false;
    if (!quizSettings.fields || !quizSettings.source) return false;
    if (!quizSettings.sourceType) return false;

    return true;
};

const quizSettingsReducer = (quizSettings, action) => {
    switch (action.type) {
        case ACTION_UPDATE_FIELDS:
            return { ...quizSettings, fields: action.payload };
        case ACTION_UPDATE_SOURCE:
            return { ...quizSettings, source: action.payload };
        case ACTION_UPDATE:
            return action.payload;
        default:
            return quizSettings;
    }
}

const QuizSettingsProvider = ({ children }) => {
    const [quizSettings, dispatch] = useReducer(quizSettingsReducer, initialQuizSettings, () => {
        const quizSettings = JSON.parse(localStorage.getItem(QUIZ_SETTINGS_KEY));
        return quizSettings ? quizSettings : initialQuizSettings;
    });

    useEffect(() => {
        if (areSettingsValid(quizSettings)) {
            localStorage.setItem(QUIZ_SETTINGS_KEY, JSON.stringify(quizSettings));
        }
    }, [quizSettings]);

    const setQuizSettings = (value) => {
        dispatch({ type: ACTION_UPDATE, payload: value });
    };

    return (
        <QuizSettingsContext.Provider value={{ quizSettings, setQuizSettings }}>
            {children}
        </QuizSettingsContext.Provider>
    );
}
export default QuizSettingsProvider;
