import React, { useState } from "react";
import Image from "next/image";
import styles from "./ReadMore.module.css";
import Button from "../button";
import { BsChevronDoubleDown } from "react-icons/bs";

type Props = {
  heading: string;
  createdAt: string;
  tags: string[];
  views: number;
  content: string;
  imageUrl: string;
};

const ReadMore: React.FC<Props> = ({
  heading,
  createdAt,
  tags = [],
  views = 0,
  content = "",
  imageUrl,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const expandContent = () => setShowFullContent(true);

  return (
    <article className={`${styles.wrapper}`}>
      <div className="post-header">
        <h2 className="title">
          <a href="single.html">{heading}</a>
        </h2>
        {/* Post Details */}
        <div className="post-details">
          <div className="post-cat">
            <a href="#">Travel</a>
          </div>
          <a href="#" className="post-date">
            <span>Aug 06, 2018</span>
          </a>
          <div className="post-details-child">
            <a href="#" className="post-views">
              15 views
            </a>
            <a href="#" className="post-comments">
              03 Comments
            </a>
            <div className="post-share-icon">
              <span>SHARE</span>
              <ul>
                <li>
                  <a href="#">
                    <i className="fa fa-facebook" />
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-google" />
                    <span>Google Plus</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-twitter" />
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-behance" />
                    <span>Behance</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-dribbble" />
                    <span>Dribbble</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* End Post Details */}
      </div>
          <Image
            src={imageUrl}
            alt={`${heading}`}
            height={500}
            width={500}
            priority
          />

      <div className="post-content">
        {/* The Content */}
        <form className={!showFullContent ? styles.readMoreContent : ""}>
          <div dangerouslySetInnerHTML={{ __html: content } as any} />
        </form>
        {/* End The Content */}
      </div>
      {!showFullContent && (
        <div className={styles.readMoreWrp}>
          <Button onPress={expandContent} className={styles.readMoreBtn}>
            Read More <BsChevronDoubleDown />
          </Button>
        </div>
      )}
    </article>
  );
};

export default ReadMore;
