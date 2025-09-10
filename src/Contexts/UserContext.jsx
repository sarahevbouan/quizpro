import { createContext, useEffect, useState } from "react";
import { getSessionStorageItem, setSessionStorageItem } from "../Utils/utils";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const retrievedUserId = getSessionStorageItem("activeUserId");
  const [activeUserId, setActiveUserId] = useState(retrievedUserId);
  useEffect(() => {
    setSessionStorageItem("activeUserId", activeUserId);
  }, [activeUserId]);
  return (
    <UserContext.Provider value={{ activeUserId, setActiveUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
