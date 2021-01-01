import React from "react";
// import classNames from "classnames/bind";
import { Link } from "gatsby";

import style from "./postList.module.scss";

function readingTimeStr(readingTime) {
  const displayed = Math.ceil(readingTime.minutes.toFixed(2));
  return `${displayed} мин.`;
}
class PostList extends React.Component {
  render() {
    return (
      <section className={style.list}>
        {this.props.posts.map(({ node }) => {
          readingTimeStr(node.fields.readingTime);
          const title = node.frontmatter.title;
          const slug = node.fields.slug;
          const readingTime = readingTimeStr(node.fields.readingTime);
          const preview =
            node.frontmatter.img &&
            node.frontmatter.img.childImageSharp.fluid.src;
          const excerpt = node.frontmatter.description || node.excerpt;
          const date = node.frontmatter.date;

          return (
            <Post
              key={slug} // React.js key
              title={title}
              preview={preview}
              excerpt={excerpt}
              slug={slug}
              readingTime={readingTime}
              date={date}
            />
          );
        })}
      </section>
    );
  }
}

class Post extends React.Component {
  render() {
    const { slug, preview, title, excerpt, readingTime, date } = this.props;

    return (
      <article key={slug} className={style.article}>
        <Link to={slug} className={style.thumbnail}>
          <div className={style.imgAspect}>
            <img src={preview} alt={title} />
          </div>
        </Link>

        <div className={style.content}>
          <h2 className={style.content_title}>
            <Link to={slug}>{title}</Link>
          </h2>
          <p dangerouslySetInnerHTML={{ __html: excerpt }} />
          <span className={style.content_meta}>
            {date}, — {readingTime}
          </span>
        </div>
      </article>
    );
  }
}

export default PostList;
