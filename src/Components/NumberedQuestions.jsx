import styles from "./NumberedQuestions.module.css";

const NumberedQuestions = ({
  questions,
  dispatchedAction,
  activeQuestionID,
}) => {
  return (
    <div className={styles["numbered-question-list"]}>
      {questions.map((question) => (
        <QuestionItem
          key={question.questionID}
          question={question}
          dispatchedAction={dispatchedAction}
          activeQuestionID={activeQuestionID}
        />
      ))}
    </div>
  );
};

export default NumberedQuestions;

const QuestionItem = ({ question, dispatchedAction, activeQuestionID }) => {
  return (
    <p
      className={
        question.questionID === activeQuestionID
          ? styles["current-question"]
          : ""
      }
      onClick={() =>
        dispatchedAction({ type: "pickQuestion", payload: question.questionID })
      }
    >
      {question.questionID}
    </p>
  );
};
