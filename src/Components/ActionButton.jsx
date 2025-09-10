import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { DifficultyLevelContext } from "../Contexts/DifficultyLevelContext";
import {
  getLocalStorageItem,
  removeSessionStorageItem,
  setLocalStorageItem,
} from "../Utils/utils";
import Button from "./Button";

const ActionButton = ({
  children,
  dispatchedAction,
  typeOfAction,
  resultLog = null,
  userResponses = null,
  questions = null,
  subjectId = null,
  // logResult = false,
}) => {
  const { activeUserId } = useContext(UserContext);
  const { difficultyLevel } = useContext(DifficultyLevelContext);
  const previousResultLog = getLocalStorageItem("resultLog");
  console.log(previousResultLog);
  const handleClick = () => {
    dispatchedAction({ type: typeOfAction });
    if (userResponses) {
      const userResultLog = {
        userID: activeUserId,
        testLogs: [
          {
            subjectID: subjectId,
            difficultyLevel: difficultyLevel,
            score: `${userResponses.reduce(
              (prevTotal, currentItem) => prevTotal + currentItem.scorePoints,
              0
            )}/${questions.reduce(
              (prevTotal, current) => prevTotal + current.points,
              0
            )}`,
          },
        ],
      };
      resultLog.current = previousResultLog
        ? previousResultLog.find((log) => log.userID === activeUserId)
          ? previousResultLog.map((log) => {
              if (log.userID === activeUserId) {
                return {
                  ...log,
                  testLogs: [...log.testLogs, userResultLog.testLogs[0]],
                };
              } else {
                return log;
              }
            })
          : [...previousResultLog, userResultLog]
        : [userResultLog];

      // localStorage.setItem("resultLog", JSON.stringify(resultLog.current));
      setLocalStorageItem("resultLog", resultLog.current);
      // removeLocalStorageItem("activeQuestionID");
      removeSessionStorageItem("userResponses");
      // removeLocalStorageItem("activeQuestionID");
      // removeLocalStorageItem("activeQuestionID");
    }
  };
  return <Button handleClick={handleClick}>{children}</Button>;
};

export default ActionButton;
