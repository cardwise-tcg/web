import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.appFooter}>
            <div>
                made with ❤️ by <a href="https://itodorova.dev">Ivanka Todorova</a>
            </div>
            <div>
                source code at <a href="https://github.com/cardwise-tcg/web">github</a>
            </div>
        </footer>
    )
}

export default Footer;
