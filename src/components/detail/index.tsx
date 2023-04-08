import Image from "next/image";
import React from "react";
import { BsFillCalendarFill, BsFillEyeFill, BsFillShareFill } from "react-icons/bs";
import Heading from "../heading";
import ReadMore from "../read-more";
import Badge from "../tag";

type Content = {
  heading: string;
  imageUrl: string;
  views: number;
  postContent: string;
  createdAt: string;
  tags: string[];
  description: string;
};

type Props = {
  content: Content;
  relatedPost: Content[];
};

const Detail = (props: Props) => {
  const {
    content: { heading, postContent, views, createdAt, imageUrl, tags },
    relatedPost = [],
  } = props;
  return (
    <>
      <div className="posts-inner">
        <article className="post">
          <div className="post-header">
            <div className="title">
              <hr />
              <Heading>{heading}</Heading>
              <hr />
            </div>
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
          <div className="post-media text-center">
            <Image
              src={imageUrl}
              height={500}
              width={500}
              priority
              alt={props.content.description}
            />
          </div>
          <div className="post-content mt-3">
            <form>
              <div dangerouslySetInnerHTML={{ __html: postContent } as any} />
            </form>
          </div>
        </article>
      </div>

      {relatedPost.length !== 0 ? (
        <div id="related-posts">
          <div className="title text-center">
            <hr />
            <Heading>Related Posts</Heading>
            <hr />
          </div>
          <div className="row">
            <div className="col">
              {relatedPost.map((r, idx) => {
                return (
                  <div key={idx}>
                    <ReadMore
                      heading={r.heading}
                      createdAt={r.createdAt}
                      tags={r.tags}
                      views={r.views}
                      content={r.postContent}
                      imageUrl={r.imageUrl}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Detail;
