import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div
        style={styles.menuContainer}
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={() => setDropdownVisible(false)}
      >
        <button style={styles.menuButton}>Menu</button>
        {dropdownVisible && (
          <div style={styles.dropdownContent}>
            <Link to="/new-record" style={styles.dropdownLink}>New Record</Link>
            <Link to="/view-all" style={styles.dropdownLink}>View All</Link>
            <Link to="/bulk-upload" style={styles.dropdownLink}>Bulk Upload</Link>
          </div>
        )}
      </div>
      <button style={styles.logoutButton} onClick={() => { localStorage.removeItem('token'); window.location.href = '/signin'; }}>Logout</button>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#3E4A89',  // Dark Blue
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  menuContainer: {
    position: 'relative',
  },
  menuButton: {
    backgroundColor: '#3E4A89',
    color: '#fff',
    padding: '12px 20px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  dropdownContent: {
    position: 'absolute',
    backgroundColor: '#fff',
    minWidth: '200px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    borderRadius: '5px',
    marginTop: '10px',
    display: 'block',
  },
  dropdownLink: {
    color: '#333',
    padding: '12px 16px',
    textDecoration: 'none',
    display: 'block',
    fontSize: '16px',
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.3s',
  },
  dropdownLinkHover: {
    backgroundColor: '#ddd',
  },
  logoutButton: {
    backgroundColor: '#F44336',  // Red for logout
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
};

export default Navbar;
