import styles from './Button.module.css';

const Button = ({ onClick, children, containerStyle }) => {

    return (
        <button onClick={onClick} className={[styles.button, containerStyle].join(' ')}>
            {children}
        </button>
    )

};

export default Button;
