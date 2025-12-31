import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { DifficultyLevelContext } from "../Contexts/DifficultyLevelContext";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
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
}) => {
  const { activeUserId } = useContext(UserContext);
  const { difficultyLevel } = useContext(DifficultyLevelContext);
  const previousResultLog = getStorageItem(localStorage, "resultLog");

  const handleClick = () => {
    dispatchedAction({ type: typeOfAction });
    if (userResponses) {
      const userResultLog = {
        userID: activeUserId,
        testLogs: [
          {
            subjectID: subjectId,
            difficultyLevel: difficultyLevel,
            score: `${Math.round(
              (userResponses.reduce(
                (prevTotal, currentItem) => prevTotal + currentItem.scorePoints,
                0
              ) /
                questions.reduce(
                  (prevTotal, current) => prevTotal + current.points,
                  0
                )) *
                100
            )}%`,
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

      setStorageItem(localStorage, "resultLog", resultLog.current);
      setStorageItem(sessionStorage, "userPreviousResponses", userResponses);
      removeStorageItem(sessionStorage, "userResponses");
    }
  };
  return <Button handleClick={handleClick}>{children}</Button>;
};

export default ActionButton;
