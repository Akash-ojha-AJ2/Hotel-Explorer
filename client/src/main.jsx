import { createContext, StrictMode, useState,useEffect } from "react";
import { createRoot } from "react-dom/client";
import { toast } from "react-toastify";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Context = createContext({
  token: null,
  setToken: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
  logout: () => {},
  isLoggedIn:false,
  currentUser:null,
  setCurrentUser: () => {},
  backend: "",
});

const AppWrapper = () => {
  const [token, setTokenState] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

 
  const backend = import.meta.env.VITE_SERVER;  


  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  };
  const logoutt = () => {
    setToken(null);
    setUser(null);
  };

  let isLoggedIn = !!token;


  const logout = async () => {
    try {
      const response = await fetch(`${backend}/api/v1/user/logout`, {
        method: "POST",
        credentials: "include", // same as withCredentials: true in axios
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(data.message);
        setUser(null);
        setIsAuthenticated(false);
        logoutt();
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (err) {
      toast.error("Something went wrong during logout.");
      console.error("Logout error:", err);
    }
  };





  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${backend}/api/v1/user/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.user); // assuming data.user = {_id, name, etc.}
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
  
    fetchUser();
  }, []);




  return (
    <Context.Provider
      value={{token, setToken, isAuthenticated, setIsAuthenticated, user, setUser, logout,isLoggedIn,currentUser,searchTerm,setSearchTerm,backend }}
    >
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
