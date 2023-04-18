import React from "react";
import styles from './Header.module.css';
import { BsCodeSlash } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <nav className={`navbar navbar-default ${styles.header}`}>
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className={`navbar-brand ${styles.navHeading}`} href="/">
           <Image 
           height={250}
           width={250}
           src={'https://res.cloudinary.com/subooralaa/image/upload/v1681826830/logo_1_tegr1m.png'} alt={"suboor khan"} style={{padding: '30px'}}></Image>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
