import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.icons}>
        <FaFacebook style={styles.icon} />
        <FaInstagram style={styles.icon} />
        <FaLinkedin style={styles.icon} />
      </div>
      <p>© Wanderlust Private Limited</p>
      <div>
        <a href="/privacy" style={styles.link}>Privacy</a> &nbsp;
        <a href="/terms" style={styles.link}>Terms</a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#f9f3f3",
    padding: "20px",
    textAlign: "center",
    fontSize: "16px",
    color: "#333",
    width: "100%", // keep this
  },
  icons: {
    marginBottom: "10px",
  },
  icon: {
    margin: "0 4px",
    fontSize: "20px",
    cursor: "pointer",
  },
  link: {
    color: "#333",
    textDecoration: "none",
    margin: "0 5px",
  }
};

export default Footer;
