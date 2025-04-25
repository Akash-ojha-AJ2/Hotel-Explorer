import React, { useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerification from "./pages/OtpVerification";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import AddPost from "./pages/AddPost";
import ShowList from "./pages/ShowList";
import EditListing from "./pages/EditListing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Context } from "./main";

// ⬇ Layout Component
const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayoutPaths = [
    "/auth",
    "/password/forgot",
  ];
  const hideLayout = hideLayoutPaths.includes(location.pathname) ||
    location.pathname.startsWith("/otp-verification") ||
    location.pathname.startsWith("/password/reset");

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh" 
    }}>
      {!hideLayout && <Navbar />}
      <main style={{ flex: 1 }}>
        {children}
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};





// ⬇ App Component
const App = () => {
  const { isLoggedIn } = useContext(Context);

  return (
    <Router>
      <Layout>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/addpost"  element={<AddPost/>} />
              <Route path="/listing/:id" element={<ShowList />} />
              <Route path="/edit-listing/:id" element={<EditListing />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/auth" element={<Auth />} />
              <Route path="/otp-verification/:email/:phone" element={<OtpVerification />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route path="/password/reset/:token" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Routes>
        <ToastContainer theme="colored" />
      </Layout>
    </Router>
  );
};

export default App;
