import React from "react";
import Image from "next/image";
import styles from "./ListArticle.module.css";
import { BsFillCalendarFill, BsFillEyeFill } from "react-icons/bs";
import Badge from "../tag";

export type ListContent = {
  id?: string;
  heading: string;
  createdAt: string;
  tags: string[];
  views: number;
  content: string;
  imageUrl: string;
};

type Props = {
  content: ListContent[];
  hasPriority?: boolean;
  handleArticleClick?: (id: string) => void
};

const ListArticle: React.FC<Props> = ({ content, hasPriority = false, handleArticleClick = () => {} }) => {
  const renderArticles = () => {
    return content.map((c, idx) => {
      return (
        <article className={styles.listArtWrp} key={idx} onClick={() => handleArticleClick(c.id!)}>
          <div className={styles.listArtImg}>
            <Image
              src={c.imageUrl}
              alt={`${c.heading} - ${c.content}`}
              fill
              style={{ objectFit: "contain" }}
              priority={hasPriority}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
          <div className="post-content">
            <div className="post-header">
              <h2 className="title">
                <span className={styles.heading}>{c.heading}</span>
              </h2>
              {/* Post Details */}
              <div className="post-details">
                {c.tags.map((t, idx) => (
                  <div className="post-cat" key={idx}>
                    <Badge>{t}</Badge>
                  </div>
                ))}
                <br />
                <div className={`post-date mt-1 ${styles.articleDtl}`}>
                  <span><BsFillCalendarFill /> {c.createdAt}</span>
                  <span><BsFillEyeFill /> {c.views}</span>
                </div>
              </div>
              {/* End Post Details */}
            </div>
            {/* The Content */}
            <div className="the-excerpt ellipsis-4">{c.content}</div>
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
