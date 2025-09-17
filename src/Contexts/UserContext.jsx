import { createContext, useEffect, useState } from "react";
import { getStorageItem, setStorageItem } from "../Utils/utils";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const retrievedUserId = getStorageItem(sessionStorage, "activeUserId");
  const [activeUserId, setActiveUserId] = useState(retrievedUserId);
  useEffect(() => {
    setStorageItem(sessionStorage, "activeUserId", activeUserId);
  }, [activeUserId]);
  return (
    <UserContext.Provider value={{ activeUserId, setActiveUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
