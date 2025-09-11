import { Link } from "react-router-dom";
import Button from "../Components/Button";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className="container">
      <div>
        <h3>404 ERROR</h3>
        <p>The resource you're trying to reach could not be found</p>

        <Link className={styles.link} to="/">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
