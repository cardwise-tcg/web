import styles from './ButtonLink.module.css';

const ButtonLink = ({ to, children, containerStyle }) => {

    return (
        <a href={to} className={[styles.buttonLink, containerStyle].join(' ')}>
            {children}
        </a>
    )

};

export default ButtonLink;
