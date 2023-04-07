import { Profile, Tag } from "@/types/types";
import React from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Button from "../button";
import { BsFillCaretRightFill, BsLinkedin } from "react-icons/bs";
import Link from "next/link";

type Props = {
  profile: Profile;
  skills: Tag[];
};

const Navbar = ({ profile }: Props) => {
  return (
    <div className="col-md-3">
      <div className="header affix">
        <div className={styles.profileSec}>
          <Image
            src={profile.imageUrl}
            alt={`${profile.name} - ${profile.aboutMe}`}
            height={100}
            width={100}
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              border: "0.1px solid #80808040",
            }}
            priority
          />
          <h2>{profile.name}</h2>
          <p>
            {profile.designation} at{" "}
            {profile.companies[profile.companies.length - 1].name}
          </p>
          <small>{profile.aboutMe}</small>
          <div className={styles.btnGrp}>
            <Button type="secondary" className={styles.flexBtn}>
              Connect
            </Button>
            <Button type="secondary" className={styles.flexBtn}>
              {" "}
              <BsFillCaretRightFill /> LIVE Sessions
            </Button>
          </div>
        </div>
        <div className="table">
          <div className="table-cell">
            <div className="main-menu">
              <nav>
                <ul className="menu-list">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/projects">Projects</Link>
                  </li>
                  <li>
                    <Link href="/blogs">Blogs</Link>
                  </li>
                  <li>
                    <Link href="/live-sessions">LIVE Sessions</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
            {/* End Navigation */}
            {/* Socials */}
            <div className="socials">
              <a href="#" title="Behance">
                <i className="fa fa-behance" />
              </a>
              <a href="#" title="Dribbble">
                <i className="fa fa-dribbble" />
              </a>
              <a href="#" title="Facebook">
                <i className="fa fa-facebook" />
              </a>
              <a href="#" title="Google Plus">
                <i className="fa fa-google-plus" />
              </a>
              <a href="#" title="Instagram">
                <i className="fa fa-instagram" />
              </a>
              <a href="#" title="Search this site">
                <i className="fa fa-search" />
              </a>
            </div>
            {/* End Socials */}
            <div className="box-search">
              <form role="search" method="get" action="#">
                <input type="text" placeholder="Search ..." name="s" />
              </form>
            </div>
            <div className="copyright">
              <p>
                Tancho @ 2018. Design by <a href="#">Kendy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
