import React from "react";
import Image from "next/image";
import styles from './ListArticle.module.css';

type ListContent = {
  heading: string;
  createdAt: string;
  tags: string[];
  views: number;
  content: string;
  imageUrl: string;
};

type Props = {
  content: ListContent[];
};

const ListArticle: React.FC<Props> = ({ content }) => {
  const renderArticles = () => {
    return content.map((c, idx) => {
      return (
        <article className={styles.listArtWrp} key={idx}>
          <div className={styles.listArtImg}>
            <Image
              src={c.imageUrl}
              alt={`${c.heading} - ${c.content}`}
              fill
              style={{objectFit: 'contain'}}
            />

          </div>
          <div className="post-content">
            <div className="post-header">
              <h2 className="title">
                <span className={styles.heading}>{c.heading}</span>
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
                    15
                  </a>
                  <a href="#" className="post-comments">
                    03
                  </a>
                  <div className="post-share-icon">
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
            {/* The Content */}
            <div className="the-excerpt">{c.content}</div>
            {/* End The Content */}
            <div className="read-more">
              <a href="single.html">Continue Reading ...</a>
            </div>
          </div>
        </article>
      );
    });
  };

  return <div className="posts-inner list-layout">{renderArticles()}</div>;
};

export default ListArticle;
