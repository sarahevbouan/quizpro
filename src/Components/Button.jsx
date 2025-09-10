import styles from "./Button.module.css";

const Button = ({ children, classStyle = styles.btn, handleClick }) => {
  if (handleClick) {
    return (
      <button
        className={`${classStyle} ${styles.btnFamily}`}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button className={`${classStyle} ${styles.btnFamily}`}>
        {children}
      </button>
    );
  }
};

export default Button;
