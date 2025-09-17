import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import Form from "../Components/Form";
import { useContext } from "react";
import { getStorageItem, setStorageItem } from "../Utils/utils";
import Navbar from "../Components/Navbar";
import styles from "./InputForms.module.css";

const Signin = () => {
  const { setActiveUserId } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSignin = (username, password, setInvalidUserAlert) => {
    const parsedUserDB = getStorageItem(localStorage, "userDB");
    const activeUser = parsedUserDB?.find(
      (user) => user.username === username && user.password === password
    );
    if (activeUser) {
      setActiveUserId(activeUser.username);
      setInvalidUserAlert("");
      navigate("/");
      setStorageItem(sessionStorage, "activeUserId", activeUser.username);
    } else {
      setInvalidUserAlert("Incorrect Username or password");
      return;
    }
  };
  return (
    <div className="wrapper">
      <Navbar />

      <div className={`container ${styles.bgContainer}`}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeader}>Login</h2>
          <Form onSubmit={handleSignin}>Login</Form>

          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
