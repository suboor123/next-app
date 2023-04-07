import { Profile, Tag } from "@/types/types";
import React from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Button from "../button";
import { BsFillCaretRightFill, BsLinkedin } from "react-icons/bs";

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
                <p>{profile.designation} at {profile.companies[profile.companies.length - 1].name}</p>
                <small>{profile.aboutMe}</small>
                  <div className={styles.btnGrp}>
                      <Button type="secondary" className={styles.flexBtn}>Connect</Button>
                      <Button type="secondary" className={styles.flexBtn}> <BsFillCaretRightFill/> LIVE Sessions</Button>
                  </div>
              </div>
        <div className="table">
          <div className="table-cell">
            <div className="main-menu">
              <nav>
                <ul className="menu-list">
                  <li className="menu-item-has-children">
                    <a href="index.html">Home</a>
                    <ul className="sub-menu">
                      <li>
                        <a href="index.html">Standard Layout</a>
                      </li>
                      <li>
                        <a href="index-grid.html">Grid Layout</a>
                      </li>
                      <li>
                        <a href="index-grid-1st-large.html">Grid 1st Large</a>
                      </li>
                      <li>
                        <a href="index-list.html">List Layout</a>
                      </li>
                      <li>
                        <a href="index-list-1st-large.html">List 1st Large</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="about.html">About</a>
                  </li>
                  <li>
                    <a href="#">Lifestyle</a>
                  </li>
                  <li>
                    <a href="#">Travel</a>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="single.html">Single</a>
                    <ul className="sub-menu">
                      <li>
                        <a href="single.html">Image</a>
                      </li>
                      <li>
                        <a href="single.html">Gallery</a>
                      </li>
                      <li>
                        <a href="single.html">Slideshow</a>
                      </li>
                      <li>
                        <a href="single.html">Youtube Video</a>
                      </li>
                      <li>
                        <a href="single.html">Vimeo Video</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="contact.html">Contact</a>
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
