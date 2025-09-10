import { Link } from "react-router-dom";
import styles from "./SubjectList.module.css";
import { useContext, useEffect, useState } from "react";
import { DifficultyLevelContext } from "../Contexts/DifficultyLevelContext";
import {
  removeSessionStorageItem,
  setSessionStorageItem,
  toSentenceCase,
} from "../Utils/utils";

const SubjectList = () => {
  const subjects = ["Biology", "Chemistry", "Computer Science", "English"];

  return (
    <div>
      <div className={styles.subjectList}>
        {subjects.map((subject) => (
          <Subject key={subject} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default SubjectList;

const Subject = ({ subject }) => {
  // const [questionLevels, setQuestionLevels] = useState(false);
  // const { difficultyLevel, setDifficultyLevel } = useContext(
  //   DifficultyLevelContext
  // );
  // const difficultyLevels = ["Easy", "Medium", "Hard"];
  // useEffect(() => {
  //   setSessionStorageItem("quizDifficultyLevel", difficultyLevel);
  // }, [difficultyLevel]);
  const handleClick = () => {
    removeSessionStorageItem("status");
  };
  return (
    <div className={styles.listItem}>
      <div className={styles.subjectItem}>
        <div>
          <img src="images/subject-frame.png" alt="Subject Frame" />
        </div>
        <div>
          <p className={styles.subjectTitle}>{toSentenceCase(subject)}</p>
          {/* {questionLevels && (
            <ul className={styles.level}>
              {difficultyLevels.map((level) => (
                <li
                  key={level}
                  onClick={() => setDifficultyLevel(level.toLowerCase())}
                >
                  <Link to={`/quiz/${subject.toLowerCase()}`}>{level}</Link>
                </li>
              ))}
            </ul>
          )} */}
        </div>
      </div>
      <Link to={`/quizlevel/${subject.toLowerCase()}`} onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
      </Link>
    </div>
  );
};
