import styles from "./ReviewAnswers.module.css";
import { question as questionStyle, optionBtn } from "./Question.module.css";
import { getStorageItem } from "../Utils/utils";

const ReviewAnswers = ({ questions, userResponses }) => {
  const userPreviousResponses = getStorageItem(
    sessionStorage,
    "userPreviousResponses"
  );
  const previousResponses = userPreviousResponses || userResponses;
  return (
    <div className={styles["question-answer-group"]}>
      {questions.map((question) => (
        <ReviewAnswer
          key={question.questionID}
          question={question}
          userResponses={previousResponses}
        />
      ))}
    </div>
  );
};

export default ReviewAnswers;
const ReviewAnswer = ({ question, userResponses }) => {
  const choosenAnswer = userResponses?.find(
    (userResponse) => userResponse.questionID === question.questionID
  )?.choosenOption;
  return (
    <div className="marginB">
      <p
        className={questionStyle}
      >{`${question.questionID}) ${question.question}`}</p>
      <div>
        {question.answerOptions.map((option, index) => {
          const isChoosen = option === choosenAnswer;
          const isCorrect = option === question.correctOption;
          const isCorrectButNotSelected =
            option === question.correctOption && option !== choosenAnswer;
          const isCorrectAndSelected =
            option === question.correctOption && option === choosenAnswer;
          const isWrongAndSelected =
            option === choosenAnswer && option !== question.correctOption;
          const isWrongButNotSelected =
            option !== question.correctOption && option !== choosenAnswer;
          return (
            <button
              className={`${optionBtn} ${
                isCorrectButNotSelected ? styles["correct-notSelected"] : ""
              } ${isCorrectAndSelected ? styles["correct-selected"] : ""} ${
                isWrongAndSelected ? styles["wrong-selected"] : ""
              } ${isWrongButNotSelected ? styles["wrong-notSelected"] : ""} ${
                isChoosen ? styles["choosenAnswer"] : ""
              } ${isCorrect ? styles["correct"] : ""}`}
              key={index}
            >
              {option}
            </button>
          );
        })}
      </div>
      <p className={styles.noSelection}>{!choosenAnswer && "*Unanswered"}</p>
    </div>
  );
};
