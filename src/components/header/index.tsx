import React from "react";
import styles from './Header.module.css';
import { BsCodeSlash } from "react-icons/bs";
import Image from "next/image";

const Header = () => {
  return (
    <nav className={`navbar navbar-default ${styles.header}`}>
      <div className="container-fluid">
        <div className="navbar-header">
          <a className={`navbar-brand ${styles.navHeading}`} href="#">
           <Image 
           height={250}
           width={250}
           src={'https://suboorkhan.com/admin/assets/logo.png'} alt={"suboor khan"} style={{padding: '30px'}}></Image>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
