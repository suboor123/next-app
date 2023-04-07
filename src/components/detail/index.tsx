import Image from "next/image";
import React from "react";
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
    <div className="posts">
      <div className="posts-inner">
        <article className="post">
          <div className="post-header">
            <div className="title">
             <hr />
             <Heading>{heading}</Heading>
            </div>
            {/* Post Details */}
            <div className="post-details">
              <div className="post-cat">
                {tags.map((t, idx) => (
                  <span key={idx}>
                    <Badge>{t}</Badge>
                  </span>
                ))}
              </div>
              <a href="#" className="post-date">
                <span>{createdAt}</span>
              </a>
              <div className="post-details-child">
                <a href="#" className="post-views">
                  {views} views
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
          <div className="post-media">
            <Image
              src={imageUrl}
              height={500}
              width={500}
              priority
              alt={props.content.description}
            />
          </div>
          <div className="post-content">
            <form>
              <div dangerouslySetInnerHTML={{ __html: postContent } as any} />
            </form>
          </div>
        </article>
      </div>

      {relatedPost.length !== 0 ? (
        <div id="related-posts">
          <div className="title">
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
    </div>
  );
};

export default Detail;
