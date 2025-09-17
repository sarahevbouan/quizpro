import { useContext, useEffect, useReducer, useRef } from "react";
import Header from "./Header";
import Question from "./Question";
import ActionButton from "./ActionButton";
import styles from "./Quiz.module.css";
import NumberedQuestions from "./NumberedQuestions";
import ReviewAnswers from "./ReviewAnswers";
import { Link, useParams } from "react-router-dom";
import { DifficultyLevelContext } from "../Contexts/DifficultyLevelContext";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
  toSentenceCase,
} from "../Utils/utils";
import Button from "./Button";
import Score from "./Score";

const Quiz = () => {
  const { subjectId } = useParams();
  let retrievedQuestionID;
  let retrievedStatus;
  let retrievedQuestions;
  let retrievedTimeRemaining;
  let retrievedUserResponses;
  if (subjectId === getStorageItem(sessionStorage, "subjectId")) {
    retrievedQuestionID = getStorageItem(sessionStorage, "activeQuestionID");
    retrievedStatus = getStorageItem(sessionStorage, "status");
    retrievedQuestions = getStorageItem(sessionStorage, "questions");
    retrievedTimeRemaining = getStorageItem(sessionStorage, "timeRemaining");
    retrievedUserResponses = getStorageItem(sessionStorage, "userResponses");
  }

  const resultLog = useRef(null);

  const TIME_PER_QUESTION = 360;
  const initialState = {
    questions: retrievedQuestions ? retrievedQuestions : [],
    //laoding, ready, error, active, finish
    status: retrievedStatus ? retrievedStatus : null,
    activeQuestionID: retrievedQuestionID ? Number(retrievedQuestionID) : 1,
    selectedAnswer: null,
    timeRemaining: retrievedTimeRemaining ? retrievedTimeRemaining : null,
    userResponses: retrievedUserResponses ? retrievedUserResponses : [],
    isSubmitted: false,
  };
  const { difficultyLevel } = useContext(DifficultyLevelContext);

  const quizReducer = (state, action) => {
    switch (action.type) {
      case "loading":
        return { ...state, status: "loading" };
      case "ready":
        return {
          ...state,
          questions: action.payload,
          status: retrievedStatus === "active" ? retrievedStatus : "ready",
        };
      case "error":
        return { ...state, status: "error" };
      case "active":
        return {
          ...state,
          status: "active",
          timeRemaining: TIME_PER_QUESTION * state.questions.length,
        };
      case "tickingTime":
        return {
          ...state,
          timeRemaining:
            state.timeRemaining > 0
              ? state.timeRemaining - 1
              : state.timeRemaining,
          status: state.timeRemaining === 0 ? "finished" : state.status,
          selectedAnswer:
            state.timeRemaining === 0 ? null : state.selectedAnswer,
          activeQuestionID:
            state.timeRemaining === 0 ? 1 : state.activeQuestionID,
          isSubmitted: state.timeRemaining === 0 ? true : state.isSubmitted,
        };
      case "nextQuestion":
        return state.activeQuestionID < state.questions.length
          ? {
              ...state,
              activeQuestionID: state.activeQuestionID + 1,
              selectedAnswer: null,
            }
          : state;
      case "previousQuestion":
        return state.activeQuestionID > 1
          ? {
              ...state,
              activeQuestionID: state.activeQuestionID - 1,
              selectedAnswer: null,
            }
          : state;
      case "pickQuestion":
        return {
          ...state,
          activeQuestionID: action.payload,
          selectedAnswer: null,
        };
      case "isAnswered":
        return {
          ...state,
          selectedAnswer: action.payload.answer,

          userResponses: [
            ...state.userResponses.filter(
              (userResponse) =>
                action.payload.questionID !== userResponse.questionID
            ),
            {
              questionID: action.payload.questionID,
              choosenOption: action.payload.answer,
              scorePoints:
                action.payload.answer === action.payload.correctOption
                  ? action.payload.points
                  : 0,
            },
          ],
        };
      case "finished":
        return {
          ...state,
          status: "finished",
          selectedAnswer: null,
          activeQuestionID: 1,
          timeRemaining: null,
          isSubmitted: true,
        };
      case "reviewAnswers":
        return {
          ...state,
          status: "reviewAnswers",
          questions: state.questions,
          userResponses: state.userResponses,
        };
      default:
        console.log("Unspecified action type");
    }
  };
  const [
    {
      questions,
      status,
      activeQuestionID,
      selectedAnswer,
      timeRemaining,
      userResponses,
      isSubmitted,
    },
    dispatch,
  ] = useReducer(quizReducer, initialState);
  useEffect(() => {
    const getQuestions = async () => {
      try {
        dispatch({ type: "loading" });
        const response = await fetch(`/api/questions/${subjectId}`);
        if (!response.ok) {
          throw new Error("Could not fetch questions!");
        }
        const data = await response.json();
        dispatch({
          type: "ready",
          payload: data.questions[difficultyLevel],
        });
      } catch {
        dispatch({ type: "error" });
      }
    };

    if (!["active", "finished", "reviewAnswers"].includes(status)) {
      getQuestions();
    }
  }, [difficultyLevel, subjectId]);
  useEffect(() => {
    setStorageItem(sessionStorage, "activeQuestionID", activeQuestionID);
    setStorageItem(sessionStorage, "status", status);
    setStorageItem(sessionStorage, "questions", questions);

    if (!isSubmitted) {
      setStorageItem(sessionStorage, "userResponses", userResponses);
    }
    setStorageItem(sessionStorage, "subjectId", subjectId);
    setStorageItem(sessionStorage, "timeRemaining", timeRemaining);
  }, [
    activeQuestionID,
    status,
    questions,
    userResponses,
    timeRemaining,
    subjectId,
    isSubmitted,
  ]);

  useEffect(() => {
    if (timeRemaining === 0) {
      removeStorageItem(sessionStorage, "userResponses");
    }
  }, [timeRemaining]);
  return (
    <div className={`${styles["quiz-app"]}`}>
      <div>
        <h2
          className="marginB"
          style={{ textAlign: "center" }}
        >{`${subjectId.toUpperCase()}: ${toSentenceCase(difficultyLevel)}`}</h2>
        <main>
          {status === "loading" && <p className="">Loading...</p>}
          {status === "ready" && (
            <div className="">
              <p className="marginB">
                There are {questions.length} questions in this section. You have{" "}
                <span className={styles.timeLeft}>
                  {" "}
                  {Math.floor(
                    (TIME_PER_QUESTION * questions.length) / 60
                  )} mins{" "}
                  {(TIME_PER_QUESTION * questions.length) % 60
                    ? `${(TIME_PER_QUESTION * questions.length) % 60} secs`
                    : ""}{" "}
                </span>
                to complete the test. Click the button below to start. Goodluck!
                🤞
              </p>
              <div className={styles["instruction-footer"]}>
                <Button
                  handleClick={() => {
                    dispatch({ type: "active" });
                  }}
                >
                  Start test
                </Button>
                <Button>
                  <Link to={`/quizlevel/${subjectId}`}>Change level</Link>
                </Button>
              </div>
            </div>
          )}
          {status === "active" && (
            <div className="">
              <Header
                questions={questions}
                activeQuestionID={activeQuestionID}
                timeRemaining={timeRemaining}
                onTimeTick={dispatch}
              />
              <Question
                questions={questions}
                activeQuestionID={activeQuestionID}
                selectedAnswer={selectedAnswer}
                onAnswerSelection={dispatch}
                userResponses={userResponses}
                key={questions[activeQuestionID - 1].questionID}
              />
              <footer className={`${styles.footer} marginB`}>
                <ActionButton
                  dispatchedAction={dispatch}
                  typeOfAction="previousQuestion"
                >
                  Previous
                </ActionButton>
                {activeQuestionID < questions.length ? (
                  <ActionButton
                    dispatchedAction={dispatch}
                    typeOfAction="nextQuestion"
                  >
                    Next
                  </ActionButton>
                ) : (
                  <ActionButton
                    dispatchedAction={dispatch}
                    typeOfAction="finished"
                    resultLog={resultLog}
                    userResponses={userResponses}
                    questions={questions}
                    subjectId={subjectId}
                  >
                    Finish
                  </ActionButton>
                )}
              </footer>
              <NumberedQuestions
                dispatchedAction={dispatch}
                questions={questions}
                activeQuestionID={activeQuestionID}
              />
            </div>
          )}
          {
            status === "finished" && (
              <Score
                userResponses={userResponses}
                questions={questions}
                dispatch={dispatch}
              />
            )
            //   <div className="">
            //     <p className={`${styles.finalScore} marginB`}>
            //       Score: <br />{" "}
            //       {
            //         <span>
            //           {userResponses.reduce(
            //             (prevTotal, currentItem) =>
            //               prevTotal + currentItem.scorePoints,
            //             0
            //           )}
            //           /
            //           {questions.reduce(
            //             (prevTotal, current) => prevTotal + current.points,
            //             0
            //           )}
            //         </span>
            //       }
            //     </p>
            //     <div className={styles.footerCol}>
            //       <Button>
            //         <Link to="/">Take another quiz</Link>
            //       </Button>
            //       <ActionButton
            //         dispatchedAction={dispatch}
            //         typeOfAction="reviewAnswers"
            //       >
            //         Review answers
            //       </ActionButton>
            //     </div>
            //   </div>
          }
          {status === "reviewAnswers" && (
            <>
              <div className={`${styles.footer} ${styles.nav} marginB`}>
                <Link to="/">Take another test</Link>
                <Link to="/userResult">See all scores</Link>
              </div>
              <ReviewAnswers
                questions={questions}
                userResponses={userResponses}
              />
            </>
          )}
          {status === "error" && (
            <p className="">404 - Error fetching questions...</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Quiz;
