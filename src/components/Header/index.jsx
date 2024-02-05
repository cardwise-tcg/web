import logo from '../../assets/logo.png';
import styles from './Header.module.css';

const Header = () => (
    <header className={styles.appHeader}>
        <a href="/" className={styles.logo}>
            <img src={logo} alt="CardWise" height="60"/>
            <span className={styles.text}>
                CardWise
            </span>
        </a>
        <nav>
            <a href="/games">Games</a>
            <a href="/about">About</a>
        </nav>
    </header>
);

export default Header;
