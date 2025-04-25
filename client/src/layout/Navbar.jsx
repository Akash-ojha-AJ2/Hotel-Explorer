import React, { useContext,useState } from "react";
import { FaRegCompass } from "react-icons/fa";
import { Context } from "../main";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [localSearch, setLocalSearch] = useState("");
  const { logout,setSearchTerm  } = useContext(Context);

  const handleSearch = () => {
    setSearchTerm(localSearch); // triggers filtering in Alllisting
  };

  return (
    <nav style={styles.navbar}>
      {/* Left Section: Logo */}
      <div style={styles.leftSection}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={styles.logo}>
            <span role="img" aria-label="compass" style={styles.icon}>
              <FaRegCompass />
            </span>
            <span>Explore</span>
          </div>
        </Link>
      </div>

      {/* Center Section: Search */}
      <div style={styles.centerSection}>
      <input
        type="text"
        placeholder="Search Destinations"
        style={styles.searchInput}
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        onFocus={(e) => (e.target.style.border = "2px solid #a0c4ff")}
        onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
      />
      <button style={styles.searchButton} onClick={handleSearch}>
        Search
      </button>
    </div>

      {/* Right Section: Logout */}
      <div style={styles.rightSection}>
        <Link
          to="/addpost"
          style={{ marginRight: "20px", textDecoration: "none", color: "inherit" }}
        >
          <span style={{ margin: 0, fontSize: "17.6px" }}>Airbnb your home</span>

        </Link>
        <button style={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    height: "80px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    backgroundColor: "#f9f3f3",
    borderBottom: "1px solid #ddd",
    fontFamily: "'Poppins', sans-serif",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#111",
  },
  icon: {
    fontSize: "30px",
    color: "brown",
    marginRight: "8px",
  },
  centerSection: {
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    padding: "10px 20px",
    borderRadius: "30px",
    border: "1px solid #ddd",
    outline: "none",
    width: "300px",
    fontSize: "14px",
    transition: "border 0.1s ease",
  },
  searchButton: {
    marginLeft: "10px",
    padding: "10px 20px",
    borderRadius: "30px",
    backgroundColor: "#ff5a5f",
    color: "#fff",
    border: "1px solid black",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
  },
  AirbnbYourHome: {
    fontSize: "14px",
  },
  logoutButton: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "8px 15px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
  },
};

export default Navbar;
