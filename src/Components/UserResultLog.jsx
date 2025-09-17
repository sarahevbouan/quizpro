import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { getStorageItem, setStorageItem, toSentenceCase } from "../Utils/utils";
import Navbar from "./Navbar";
import styles from "./UserResultLog.module.css";

const UserResultLog = () => {
  const { activeUserId } = useContext(UserContext);
  const resultLog = getStorageItem(localStorage, "resultLog");
  const parsedResultLog = resultLog ? resultLog : [];
  const userResultLog = parsedResultLog.find(
    (log) => log.userID === activeUserId
  );
  return (
    <div>
      <Navbar />
      <div className="container">
        <div>
          <div className="flex">
            <h2 className={styles.marginB}>Lifetime Scores</h2>
            {userResultLog && (
              <span
                className={styles.clear}
                onClick={() => {
                  setStorageItem(
                    localStorage,
                    "resultLog",
                    resultLog.filter((log) => log.userID !== activeUserId)
                  );
                }}
              >
                Clear all
              </span>
            )}
          </div>
          <ul className={styles.resultContainer}>
            {userResultLog ? (
              [...userResultLog.testLogs]
                .reverse()
                .map(({ subjectID, score, difficultyLevel }, index) => (
                  <li
                    key={index}
                    className={`${styles.marginB} ${styles.result}`}
                  >
                    <p className={styles.subject}>
                      {toSentenceCase(subjectID)}
                    </p>
                    <p>Level: {toSentenceCase(difficultyLevel)}</p>
                    <p className={styles.score}>{score}</p>
                  </li>
                ))
            ) : (
              <li>No result found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserResultLog;
