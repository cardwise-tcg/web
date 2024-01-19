import './Root.css';
import Header from '../components/Header';

import {useOutlet} from 'react-router-dom';

const Root = () => {
    const outlet = useOutlet();

    return (
        <div className="app-container">
            <Header/>
            {
                outlet ||
                (
                    <main>
                        <h1>
                            Welcome to CardWise: Flashcards for TCGs!
                        </h1>
                    </main>
                )
            }
        </div>
    );
};

export default Root;
