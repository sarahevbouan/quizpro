import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { UserContext } from "../Contexts/UserContext";
import { removeStorageItem } from "../Utils/utils";
import Button from "./Button";

const Navbar = () => {
  const { activeUserId, setActiveUserId } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const handleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickEvent = (e) => {
      if (isOpen && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickEvent);
    return () => {
      window.removeEventListener("click", handleClickEvent);
    };
  }, [isOpen]);

  return (
    <nav className={styles["navbar"]}>
      <p className={styles.brand}>
        <Link to="/"> QuizPro</Link>
      </p>
      <ul>
        <li>
          <Button classStyle={styles.btn}>
            <NavLink to={`${activeUserId ? "/" : "/signup"}`}>
              Take Quiz
            </NavLink>
          </Button>
        </li>
        {activeUserId ? (
          <li className={styles["user-details"]} ref={dropdownRef}>
            <p className={styles["user-icon"]} onClick={handleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#d1a516"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
              </svg>
            </p>
            <ul
              id="nav-dropdown"
              className={`${styles["user-dropdown"]} ${
                styles[isOpen ? "openDrawer" : "closeDrawer"]
              }`}
            >
              <li>
                <Link to="/profile">Your profile</Link>
              </li>
              <li>
                <Link to="/userResult">Your scores</Link>
              </li>
              <li>
                <Link to="/">Take quiz</Link>
              </li>
              <Button
                handleClick={() => {
                  setActiveUserId("");
                  removeStorageItem(sessionStorage, "activeUserId");
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </ul>
          </li>
        ) : (
          <li className={styles.navLogin}>
            <NavLink to="/signin">Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
