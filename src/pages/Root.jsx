import {useOutlet} from 'react-router-dom';

import styles from './Root.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ButtonLink from '../components/ButtonLink';


const Root = () => {
    const outlet = useOutlet();

    return (
        <div className={[styles.appContainer, !outlet ? styles.center : {}].join(' ')}>
            <Header/>
            {
                outlet ||
                (
                    <main className={styles.home}>
                        <h1>
                            CardWise
                        </h1>
                        <h2 className={styles.motto}>
                            Master the TCGs you play, one card at a time.
                        </h2>

                        <p>
                            Dive into the world of Trading Card Games like never before! <strong>CardWise</strong> is your ultimate digital companion, transforming the way you learn and master your favorite TCGs.
                        </p>

                        <ButtonLink
                            to="/games"
                            containerStyle={styles.exploreBtn}>
                            &raquo; Explore supported games
                        </ButtonLink>
                    </main>
                )
            }
            <Footer/>
        </div>
    );
};

export default Root;
