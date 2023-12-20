import React from "react";
import Image from "next/image";
import styles from "./ListArticle.module.css";
import { BsFillCalendarFill, BsFillEyeFill } from "react-icons/bs";
import Badge from "../tag";
import { SessionResources } from "@/types/types";
import AttachedFiles from "./AttachedFiles";
import { useRouter } from "next/router";
import { useTimer } from "react-timer-hook";
import SessionCountdown from "../Sessions/SessionCountDown";

export type ListContent = {
  id?: string;
  heading: string;
  createdAt: string;
  tags: string[];
  views: number;
  content: string;
  imageUrl: string;
  attachedFiles?: SessionResources[];
  sessionTiming?: any;
  date?: string;
};

type Props = {
  content: ListContent[];
  hasPriority?: boolean;
  handleArticleClick?: (id: string) => void;
  style?: any;
};

const ListArticle: React.FC<Props> = ({
  content,
  hasPriority = false,
  handleArticleClick = () => {},
  ...props
}) => {
  const renderArticles = () => {
    return content.map((c, idx) => {
      return (
        <article
          className={styles.listArtWrp}
          {...props}
          key={idx}
          onClick={() => handleArticleClick(c.id!)}
        >
          <div className={styles.listArtImg}>
            <Image
              src={c.imageUrl}
              alt={`${c.heading} - ${c.content}`}
              fill
              className={styles.listArtImg as string}
              priority={hasPriority}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
          <div className="post-content ">
            <div className="post-header">
              <div className="row">
                <h2 className="title col-sm">
                  <span className={styles.heading}>{c.heading}</span>
                </h2>

                {/* Timer */}
                {c.sessionTiming && <SessionCountdown session={c} />}
              </div>
              {/* Post Details */}
              <div className="post-details">
                {c.tags.map((t, idx) => (
                  <div className="post-cat" key={idx}>
                    <Badge>{t}</Badge>
                  </div>
                ))}
                <br />
                <div className={`post-date mt-1 ${styles.articleDtl}`}>
                  <span>
                    <BsFillCalendarFill /> {c.createdAt}
                  </span>
                  <span>
                    <BsFillEyeFill /> {c.views}
                  </span>
                  {c.attachedFiles && (
                    <AttachedFiles attachedFiles={c.attachedFiles} />
                  )}
                </div>
              </div>
              {/* End Post Details */}
            </div>
            {/* The Content */}
            <div className="the-excerpt ellipsis-3">{c.content}</div>
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
