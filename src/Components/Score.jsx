import { Link } from "react-router-dom";
import { getStorageItem } from "../Utils/utils";
import ActionButton from "./ActionButton";
import Button from "./Button";
import { finalScore, footerCol } from "./Quiz.module.css";

const Score = ({ userResponses, questions, dispatch }) => {
  const userPreviousResponses = getStorageItem(
    sessionStorage,
    "userPreviousResponses"
  );
  const previousResponses = userPreviousResponses || userResponses;
  const percentScore =
    (previousResponses.reduce(
      (prevTotal, currentItem) => prevTotal + currentItem.scorePoints,
      0
    ) /
      questions.reduce((prevTotal, current) => prevTotal + current.points, 0)) *
    100;
  return (
    <div className="">
      <p className={`${finalScore} marginB`}>
        Score: <br />{" "}
        {previousResponses ? (
          <span>{Math.round(percentScore)}%</span>
        ) : (
          "No score! Take a quiz"
        )}
      </p>
      <div className={footerCol}>
        <Button>
          <Link to="/">Take another quiz</Link>
        </Button>
        <ActionButton dispatchedAction={dispatch} typeOfAction="reviewAnswers">
          Review answers
        </ActionButton>
      </div>
    </div>
  );
};

export default Score;
