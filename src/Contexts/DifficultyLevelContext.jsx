import { createContext, useState } from "react";
import { getSessionStorageItem } from "../Utils/utils";

export const DifficultyLevelContext = createContext();

const DifficultyLevelContextProvider = ({ children }) => {
  const retrievedDifficultyLevel = getSessionStorageItem("quizDifficultyLevel");
  const [difficultyLevel, setDifficultyLevel] = useState(
    retrievedDifficultyLevel ? retrievedDifficultyLevel : "easy"
  );
  return (
    <DifficultyLevelContext.Provider
      value={{ difficultyLevel, setDifficultyLevel }}
    >
      {children}
    </DifficultyLevelContext.Provider>
  );
};

export default DifficultyLevelContextProvider;
