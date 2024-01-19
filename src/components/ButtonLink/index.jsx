import styles from './ButtonLink.module.css';

const ButtonLink = ({to, text, containerStyle}) => {

    return (
        <a href={to} className={[styles.buttonLink, containerStyle].join(' ')}>
            {text}
        </a>
    )

};

export default ButtonLink;
