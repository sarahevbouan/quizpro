import { useContext, useEffect } from "react";
import { DifficultyLevelContext } from "../Contexts/DifficultyLevelContext";
import { setSessionStorageItem, toSentenceCase } from "../Utils/utils";
import styles from "./SubjectLevel.module.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Button from "./Button";

const SubjectLevel = () => {
  const { subjectId } = useParams();
  const { difficultyLevel, setDifficultyLevel } = useContext(
    DifficultyLevelContext
  );
  const difficultyLevels = ["Easy", "Medium", "Hard"];
  useEffect(() => {
    setSessionStorageItem("quizDifficultyLevel", difficultyLevel);
  }, [difficultyLevel]);
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className={styles.levelContainer}>
          <h2>{toSentenceCase(subjectId)}</h2>
          <ul className={styles.levelGroup}>
            {difficultyLevels.map((level) => (
              <li
                className={styles.level}
                key={level}
                onClick={() => setDifficultyLevel(level.toLowerCase())}
              >
                <img src="/images/level.png" alt="" />
                <Link to={`/quiz/${subjectId}`}>{level}</Link>
              </li>
            ))}
          </ul>
          <Button>
            <Link to="/">Change Subject</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubjectLevel;
