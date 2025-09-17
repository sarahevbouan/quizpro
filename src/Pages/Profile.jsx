import { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import styles from "./Profile.module.css";
import Button from "../Components/Button";
import { UserContext } from "../Contexts/UserContext";
import { getStorageItem, setStorageItem } from "../Utils/utils";

const Profile = () => {
  const { activeUserId } = useContext(UserContext);
  const [name, setName] = useState(activeUserId);
  const [password, setPassword] = useState("");
  const [editPassword, setEditPassword] = useState(true);

  const saveUserInfo = (userPassword) => {
    if (userPassword.length < 6) {
      alert("Password must be at least six digits");
      return;
    }
    const userDB = getStorageItem(localStorage, "userDB");
    const updatedUserDB = userDB?.filter(
      (user) => user.username !== activeUserId
    );
    setStorageItem(localStorage, "userDB", [
      ...updatedUserDB,
      { username: name, password: userPassword },
    ]);
    setEditPassword(true);
    setPassword("");
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className={styles.profileContainer}>
          <h2 className={styles.header}>Your Profile</h2>
          <div>
            <div className={styles.inputGroup}>
              <div>
                <p className={styles.inputLabel}>Name</p>
                <input type="text" value={name} disabled />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <div>
                <p className={styles.inputLabel}>Password</p>
                <input
                  type="password"
                  value={password}
                  placeholder="******"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={editPassword}
                />
              </div>
              <div className={styles.editActions}>
                {!editPassword && (
                  <Button handleClick={() => setEditPassword(true)}>
                    Cancel
                  </Button>
                )}
                {editPassword ? (
                  <Button handleClick={() => setEditPassword(false)}>
                    Change
                  </Button>
                ) : (
                  <Button handleClick={() => saveUserInfo(password)}>
                    Save
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
