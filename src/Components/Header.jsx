import { useEffect } from "react";
import styles from "./Header.module.css";

const Header = ({ questions, activeQuestionID, timeRemaining, onTimeTick }) => {
  const minutesLeft = Math.floor(timeRemaining / 60);
  const secondsLeft = timeRemaining % 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      onTimeTick({ type: "tickingTime" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onTimeTick]);

  return (
    <div className={styles["header"]}>
      <ProgressBar
        questions={questions}
        activeQuestionID={activeQuestionID}
      ></ProgressBar>
      <div className={`${styles["progress-info"]} marginB`}>
        <p className="questions-left">
          {activeQuestionID}/{questions.length}
        </p>
        <p
          className={`${styles.counter} ${
            minutesLeft < 1 ? styles.dieMinute : ""
          }`}
        >
          🕒 {minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:
          {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
        </p>
      </div>
    </div>
  );
};

export default Header;

const ProgressBar = ({ questions, activeQuestionID }) => {
  return (
    <progress
      className={styles["progress-bar"]}
      max={questions.length}
      value={Number(activeQuestionID)}
    ></progress>
  );
};
