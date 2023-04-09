import React, { useLayoutEffect, useState } from "react";
import Image from "next/image";
import styles from "./ReadMore.module.css";
import Button from "../button";
import { BsChevronDoubleDown, BsFillCalendarFill, BsFillEyeFill, BsFillShareFill } from "react-icons/bs";
import Badge from "../tag";

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

  useLayoutEffect(() => {
    const d = document.querySelectorAll('pre');
    d.forEach(pre => {
      pre.classList.add('prettyprint')
    })
  },[])

  return (
    <article className={`${styles.wrapper}`}>
      <div className="post-header">
        <h2 className="title text-center">
          <a href="single.html">{heading}</a>
        </h2>
        {/* Post Details */}
        <div className="post-details">
              <div className="post-cat">
                {tags.map((t, idx) => (
                  <span key={idx} style={{ marginRight: "10px" }}>
                    <Badge>{t}</Badge>
                  </span>
                ))}
              </div>
              <a href="#" className="post-date">
                <span>
                  <BsFillCalendarFill /> {createdAt}
                </span>
              </a>
              <div className="post-details-child">
              <a href="#" className="post-date">
              <span>
                  <BsFillEyeFill /> {views} views
                </span>
              </a>
                <div className="post-share-icon">
                  <span><BsFillShareFill /> SHARE</span>
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" />
                        <span>Facebook</span>
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
         <div className="text-center mt-3">
         <Image
            src={imageUrl}
            alt={`${heading}`}
            height={500}
            width={500}
            priority
          />
         </div>

      <div className="post-content mt-3">
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
