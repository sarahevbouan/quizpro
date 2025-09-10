// import { useState } from "react";
import Form from "../Components/Form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { getLocalStorageItem, setLocalStorageItem } from "../Utils/utils";
import styles from "./InputForms.module.css";
import graduationHat from "../assets/images/graduation-hat.png";

const Signup = () => {
  const navigate = useNavigate();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const handleSignup = (username, password, setInvalidUserAlert) => {
    if (password.length < 6) {
      setInvalidUserAlert("Password must be at least six digits");
      return;
    }
    const userDB = getLocalStorageItem("userDB");
    const parsedUserDB = userDB ? userDB : [];
    const retrievedUser = parsedUserDB.find(
      (user) => user.username === username
    );
    console.log(parsedUserDB);
    console.log(retrievedUser);
    if (retrievedUser) {
      setInvalidUserAlert("User already exist");
      // return;
    } else {
      setLocalStorageItem("userDB", [...parsedUserDB, { username, password }]);
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
        {/* <div className="rightPanel">
          <img className="heroImg" src={graduationHat} alt="" />
        </div> */}
      </div>
    </div>
  );
};

export default Signup;
