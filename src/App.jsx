import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
// import Signin from "./Pages/Signin";
import UserContextProvider from "./Contexts/UserContext";
// import Quiz from "./Components/Quiz";
// import Home from "./Pages/Home";
// import Signup from "./Pages/Signup";
import "./App.css";
import DifficultyLevelContextProvider from "./Contexts/DifficultyLevelContext";
import NotFound from "./Pages/NotFound";
// import UserResultLog from "./Components/UserResultLog";
import { lazy, Suspense } from "react";
import "./global.css";
import SubjectLevel from "./Components/SubjectLevel";
// import { DifficultyLevelContextProvider } from "./Contexts/DifficultyLevelContext";
const Home = lazy(() => import("./Pages/Home"));
const Signin = lazy(() => import("./Pages/Signin"));
const Signup = lazy(() => import("./Pages/Signup"));
const Quiz = lazy(() => import("./Components/Quiz"));
const UserResultLog = lazy(() => import("./Components/UserResultLog"));
const Profile = lazy(() => import("./Pages/Profile"));

const App = () => {
  return (
    <Router>
      <UserContextProvider>
        <DifficultyLevelContextProvider>
          {/* <Navbar /> */}
          <Suspense fallback={<NotFound />} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/quizlevel/:subjectId" element={<SubjectLevel />} />
            <Route path="/quiz/:subjectId" element={<Quiz />} />
            <Route path="/userResult" element={<UserResultLog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DifficultyLevelContextProvider>
      </UserContextProvider>
    </Router>
  );
};

export default App;
