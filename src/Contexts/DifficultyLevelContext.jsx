import { createContext, useState } from "react";
import { getStorageItem } from "../Utils/utils";

export const DifficultyLevelContext = createContext();

const DifficultyLevelContextProvider = ({ children }) => {
  const retrievedDifficultyLevel = getStorageItem(
    sessionStorage,
    "quizDifficultyLevel"
  );
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
