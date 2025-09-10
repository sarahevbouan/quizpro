import { useContext } from "react";
import SubjectList from "../Components/SubjectList";
import { UserContext } from "../Contexts/UserContext";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
// import { container } from "../Components/Quiz.module.css";
import Navbar from "../Components/Navbar";
import Button from "../Components/Button";
import heroImg from "../assets/images/hero.png";

const Home = () => {
  const { activeUserId } = useContext(UserContext);
  return (
    <div className="wrapper">
      <Navbar />
      <div className="container">
        <div className="rightPanel">
          <h1 className={`${styles.marginB} ${styles.oneLiner}`}>
            <span>Learn</span>. <span>Assess</span>. <span>Achieve</span>.
          </h1>
          <img className={styles.heroImg} src={heroImg} alt="" />
        </div>
        <div className={styles.header}>
          <h1 className={styles.heading}>
            Welcome to <span>QuizPro</span>
          </h1>
          {activeUserId ? (
            <>
              <p className={styles.marginB}>
                Learning doesn't have to be overwhelming. With our interactive
                quizzes, you can test your understanding, discover your
                strengths, and work on areas that need more attention. Challenge
                yourself, and track your progress as you go. Whether you're
                preparing for exams, brushing up on skills, or just exploring
                new knowledge, QuizPro is here to help you learn.
              </p>
              <div className={styles.start}>
                <h3>Getting Started</h3>
                <p>Select a subject from the list to begin!</p>
              </div>
              <SubjectList />
            </>
          ) : (
            <div className={styles.heroText}>
              <p className={styles.marginB}>
                Master your subjects with engaging quizzes and instant feedback.
                Practice with our comprehensive quiz library, get instant
                feedback, and stay on top of your coursework.
              </p>
              <div className={styles.CTA}>
                <Button>
                  <Link to="/signup">Sign up</Link>
                </Button>
                <Button classStyle={styles.signin}>
                  <Link to="/signin">Login</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
