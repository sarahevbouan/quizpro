import styles from "./Question.module.css";

const Question = ({
  questions,
  activeQuestionID,
  selectedAnswer,
  onAnswerSelection,
  userResponses,
}) => {
  const prevAnswer = userResponses?.find(
    (userResponse) => userResponse.questionID === activeQuestionID
  )?.choosenOption;
  const handleAnswer = (answer, points, correctOption, questionID) => {
    onAnswerSelection({
      type: "isAnswered",
      payload: {
        answer: answer,
        points: points,
        correctOption: correctOption,
        questionID: questionID,
      },
    });
  };
  return (
    <div className={`${styles["question-answer-group"]} marginB`}>
      <p className={`${styles.question}`}>
        {questions[activeQuestionID - 1].question}
      </p>
      <div>
        {questions[activeQuestionID - 1].answerOptions.map((option, index) => (
          <AnswerOption
            questions={questions}
            option={option}
            selectedAnswer={selectedAnswer}
            activeQuestionID={activeQuestionID}
            handleAnswer={handleAnswer}
            key={`${activeQuestionID}-${index}`}
            prevAnswer={prevAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;

const AnswerOption = ({
  questions,
  option,
  activeQuestionID,
  handleAnswer,
  prevAnswer,
}) => {
  return (
    <button
      className={`${option === prevAnswer ? styles["selected-option"] : ""} ${
        styles.optionBtn
      }`}
      onClick={() => {
        handleAnswer(
          option,
          questions[activeQuestionID - 1].points,
          questions[activeQuestionID - 1].correctOption,
          activeQuestionID
        );
      }}
    >
      {option}
    </button>
  );
};
