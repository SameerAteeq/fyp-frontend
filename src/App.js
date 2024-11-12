// import "./App.css";
// // import img1 from './images/pic.jpg';
// import About from "./MyWebsite/About";
// import MedicineCards from "./MyWebsite/MedicineCards";

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import New from "./MyWebsite/New";
// import Login from "./MyWebsite/Login";
// import SignUp from "./MyWebsite/SignUp";
// import MainPage from "./MyWebsite/MainPage";
// import Ask from "./MyWebsite/Ask.js";
// import Settings from "./adminPanel/pages/Settings";
// import AboutDashboard from "./adminPanel/pages/AboutDashboard";
// import Account from "./adminPanel/pages/Account";
// import UserFeedback from "./adminPanel/pages/UserFeedback";
// import Home from "./adminPanel/pages/Home";
// import NotFound from "../src/adminPanel/pages/NotFound404";
// import DonateForm from "./MyWebsite/DonateForm";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<MainPage />} />
//         <Route path="/signin" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/ask" element={<Ask />} />
//         <Route path="/donate" element={<DonateForm />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<New />} />

//         <Route path="/medicines" element={<MedicineCards />} />

//         <Route path="/admin" element={<Home />} />
//         <Route exact path="/donors" element={<AboutDashboard />}></Route>
//         <Route exact path="/recipients" element={<Settings />}></Route>
//         <Route exact path="/allMedicine" element={<Home />}></Route>
//         <Route exact path="/account" element={<Account />}></Route>
//         <Route exact path="/feedback" element={<UserFeedback />}></Route>

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

// // Blog
// // Theme
// // Medicine Detail
// // Admin CURD, Doner, Needer, Company Data Entry
// // AiChat Bot
// // Image Processing

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import Redux to access the user state
import About from "./main/About";
import MedicineCards from "./main/MedicineCards";
import New from "./main/New";
import Login from "./main/Login";
import SignUp from "./main/SignUp";
import MainPage from "./main/MainPage";
import Ask from "./main/Ask";
import DonateForm from "./main/DonateForm";
import NotFound from "./NotFound404";
import AdminLogin from "./adminPanel/pages/AdminLogin";

// Higher-Order Components
import { UserRoute, PrivateRoute, AdminRoute, AdminRoutes } from "./router";
import Toast from "./components/customToasts";
import { useEffect, useState } from "react";
import { useApiManager } from "./apiManager/apiManager";
import { setUser } from "./store/reducer";
import FullScreenLoader from "./components/fullScreenLoader";
import BlogPage from "./main/Blog";
import Chatbot from "./components/chatBot/chatBot";
import Contact from "./main/Contact";

function App() {
  const apiManager = useApiManager();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.storeReducer);
  // const user = useSelector((state) => state.storeReducer.user); // Assume this is from Redux store
  const dispatch = useDispatch();

  // Check user Login
  useEffect(() => {
    addAnimationStyles();
    checkUser();
  }, []);

  const checkUser = async () => {
    setIsLoading(true);
    let role = localStorage.getItem("@role");
    let endPoint = role === "admin" ? "admin/me" : "/user/me";
    const { data, error } = await apiManager.get(endPoint);
    if (error) {
      setIsLoading(false);
      return console.log("🚀 ~ useEffect ~ error:", error);
    } else {
      // console.log("🚀 ~ checkUser ~ data:", data);
      dispatch(setUser(data?.data));
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <FullScreenLoader />}
      {!isLoading && (
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainPage />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/ask" element={<Ask />} />
            <Route path="/donate" element={<DonateForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<New />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/medicines" element={<MedicineCards />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/admin/sign-in" element={<AdminLogin />} />

            {/* Protected User Routes (Donor/Recipient) */}
            <Route
              path="/user/*"
              element={
                <PrivateRoute
                  role={["Donor", "Recipient"]}
                  component={UserRoute}
                />
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={<AdminRoute component={AdminRoutes} />}
            />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      )}
      {user?.role !== "admin" && <Chatbot />}
      <Toast />
    </>
  );
}

// Custom CSS keyframes for animation
const styles = `
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.1); /* Slightly enlarge the logo */
      opacity: 1; /* Make the logo fully visible */
    }
    100% {
      transform: scale(1);
      opacity: 0.8;
    }
  }
`;

// Add custom styles to the document
const addAnimationStyles = () => {
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(styles, styleSheet.cssRules.length);
};

export default App;
