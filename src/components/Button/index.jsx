import styles from './Button.module.css';

const Button = ({ onClick, children, containerStyle, disabled = false }) => {

    return (
        <button onClick={onClick} className={[styles.button, containerStyle].join(' ')} disabled={disabled}>
            {children}
        </button>
    )

};

export default Button;
