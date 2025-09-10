import { useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { Link } from "react-router-dom";

const Form = ({ onSubmit, children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidUserAlert, setInvalidUserAlert] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password, setInvalidUserAlert);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        placeholder="Jane Doe"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="......"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {invalidUserAlert && <p className={styles.error}>{invalidUserAlert}</p>}

      <Button>{children}</Button>
    </form>
  );
};

export default Form;
