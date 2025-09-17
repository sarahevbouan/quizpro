import Form from "../Components/Form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { getStorageItem, setStorageItem } from "../Utils/utils";
import styles from "./InputForms.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const handleSignup = (username, password, setInvalidUserAlert) => {
    if (password.length < 6) {
      setInvalidUserAlert("Password must be at least six digits");
      return;
    }
    const userDB = getStorageItem(localStorage, "userDB");
    const parsedUserDB = userDB ? userDB : [];
    const retrievedUser = parsedUserDB.find(
      (user) => user.username === username
    );
    if (retrievedUser) {
      setInvalidUserAlert("User already exist");
    } else {
      setStorageItem(localStorage, "userDB", [
        ...parsedUserDB,
        { username, password },
      ]);
      setInvalidUserAlert("");
      navigate("/signin");
    }
  };
  return (
    <div className="wrapper">
      <Navbar />
      <div className={`container ${styles.bgContainer}`}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeader}>Create an account</h2>
          <Form onSubmit={handleSignup}>Sign up</Form>
          <p>
            Already have an account? <Link to="/signin">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
