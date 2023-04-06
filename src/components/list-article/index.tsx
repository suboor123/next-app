import React from 'react'

const ListArticle = () => {
  return (
<article className="post">
  <div className="post-media" style={{backgroundImage: 'url(images/posts/2.jpg)'}}>
    <a href="single.html">
      <img src="images/posts/2.jpg" alt="Post" />
    </a>
  </div>
  <div className="post-content">
    <div className="post-header">
      <h2 className="title">
        <a href="single.html">Creativity is more than a song and dance act</a>
      </h2>
      {/* Post Details */}
      <div className="post-details">
        <div className="post-cat">
          <a href="#">Travel</a>
        </div>
        <a href="#" className="post-date"><span>Aug 06, 2018</span></a>
        <div className="post-details-child">
          <a href="#" className="post-views">15</a>
          <a href="#" className="post-comments">03</a>
          <div className="post-share-icon">
            <ul>
              <li><a href="#"><i className="fa fa-facebook" /><span>Facebook</span></a></li>
              <li><a href="#"><i className="fa fa-google" /><span>Google Plus</span></a></li>
              <li><a href="#"><i className="fa fa-twitter" /><span>Twitter</span></a></li>
              <li><a href="#"><i className="fa fa-behance" /><span>Behance</span></a></li>
              <li><a href="#"><i className="fa fa-dribbble" /><span>Dribbble</span></a></li>
            </ul>
          </div>
        </div>
      </div>
      {/* End Post Details */}
    </div>
    {/* The Content */}
    <div className="the-excerpt">
      <p>Morbi leo enim, laoreet eget urna id, ullamcorper condimentum urna. Curabitur accumsan sem et nisi ultricies porttitor...
      </p>
    </div>
    {/* End The Content */}
    <div className="read-more">
      <a href="single.html">Continue Reading ...</a>
    </div>
  </div>
</article>

  )
}

export default ListArticle