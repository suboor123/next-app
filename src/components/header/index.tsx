import React from "react";
import styles from './Header.module.css';

const Header = () => {
  return (
    <nav className={`navbar navbar-default ${styles.header}`}>
      <div className="container-fluid">
        <div className="navbar-header">
          <a className={`navbar-brand ${styles.navHeading}`} href="#">
            Suboor Khan
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
