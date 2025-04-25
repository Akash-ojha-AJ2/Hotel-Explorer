import React, { useEffect, useState, useContext } from "react";
import { Context } from "../main";
import { Link } from "react-router-dom";
import {
  FaFire,
  FaBed,
  FaCity,
  FaChessRook,
  FaMountain,
  FaCampground,
  FaSwimmer,
  FaTractor,
  FaSnowflake,
  FaShip,
} from "react-icons/fa";

const Alllisting = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const { setIsAuthenticated, searchTerm,backend } = useContext(Context);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`${backend}/api/v1/listing/`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Unauthorized or failed to fetch listings");
        }

        const data = await response.json();
        setListings(data.listings);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [setIsAuthenticated]);

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.loader}></div>
        <p>Loading listings...</p>
      </div>
    );
  }

    return (
      <div style={styles.pageContainer}>
        {/* Filters */}
        <div style={styles.filters}>
          <div style={styles.filter}><FaFire style={styles.filterIcon} /><p>Trending</p></div>
          <div style={styles.filter}><FaBed style={styles.filterIcon} /><p>Rooms</p></div>
          <div style={styles.filter}><FaCity style={styles.filterIcon} /><p>Iconic Cities</p></div>
          <div style={styles.filter}><FaChessRook style={styles.filterIcon} /><p>Castles</p></div>
          <div style={styles.filter}><FaMountain style={styles.filterIcon} /><p>Mountain Views</p></div>
          <div style={styles.filter}><FaCampground style={styles.filterIcon} /><p>Camping</p></div>
          <div style={styles.filter}><FaSwimmer style={styles.filterIcon} /><p>Amazing Nature</p></div>
          <div style={styles.filter}><FaTractor style={styles.filterIcon} /><p>Farms</p></div>
          <div style={styles.filter}><FaSnowflake style={styles.filterIcon} /><p>Arctic</p></div>
          <div style={styles.filter}><FaShip style={styles.filterIcon} /><p>Boats</p></div>
        </div>
    
        {/* Listings */}
        <div style={styles.listingsContainer}>
          {listings
            .filter((listing) =>
              listing.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((listing) => (
              <Link
                to={`/listing/${listing._id}`}
                key={listing._id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={styles.card}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <img
                    src={listing.image.url}
                    alt={listing.title}
                    style={styles.image}
                  />
                  <p style={styles.title}>{listing.title}</p>
                  <p style={styles.price}>₹{listing.price} /Night</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    );
    
};

const styles = {

  pageContainer: {
    marginTop:"20px",
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
  },
  
  listingsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    width: "400px",
    borderRadius: "20px",
    overflow: "hidden",
    padding: "0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    textAlign: "start",
    transition: "opacity 0.3s ease",
    fontFamily: "'Times New Roman', Times, serif",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "20px",
  },
  title: {
    color: "black",
    margin: "10px 0 5px 0",
    padding: "0 10px",
  },
  price: {
    fontSize: "15px",
    color: "#2E2E2E",
    padding: "0 10px 10px 10px",
  },
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "300px",
  },
  loader: {
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #ff385c",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
    marginBottom: "10px",
  },
  filters: {
    display: "flex",
    overflowX: "auto",
    padding: "10px 20px",
    gap: "20px",
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
  },
  filter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    color: "#333",
    cursor: "pointer",
    minWidth: "80px",
  },
  filterIcon: {
    fontSize: "20px",
    marginBottom: "5px",
    color: "#ff385c",
  },
};

// Add keyframes in a <style> tag since JS can't handle them
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(styleSheet);

export default Alllisting;
