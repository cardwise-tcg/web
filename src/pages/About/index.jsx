import styles from './About.module.css';
import preview from '../../assets/demo/preview.gif';
import decklist from '../../assets/demo/decklist.gif';
import quiz from '../../assets/demo/quiz.gif';

const About = () => (
    <div className={styles.pageAbout}>
        <h1>About</h1>

        <p>
            This is a simple web application, also optimized for mobile devices, that aims to help you learn new cards &
            decks as fast as possible.
        </p>

        <h2>How to use</h2>
        <p>
            <strong>1.</strong> Select one of the supported games and choose what components of the card you want to get
            quizzed on.
        </p>
        <div className={styles.imgContainer}>
            <img src={preview} alt="Preview"/>
        </div>
        <p>
            <strong>2.</strong> Choose either an official set of the game or a deck list.
        </p>
        <div className={styles.imgContainer}>
            <img src={decklist} alt="Decklist"/>
        </div>
        <p>
            <strong>3.</strong> Start the quiz and try to guess as many answers as possible.
        </p>
        <div className={styles.imgContainer}>
            <img src={quiz} alt="Quiz"/>
        </div>

        <h2>Bugs & Suggestions</h2>
        <p>
            If you find any bugs or have any suggestions, please feel free to open an issue on the project's GitHub page that can be found in the footer of this page. You can also find me on Discord as <strong>fakeheal</strong>.
        </p>
    </div>
);

export default About;
