import React from "react";
// import classNames from "classnames/bind";
import { Link } from "gatsby";

import style from "./postList.module.scss";

function readingTimeStr(readingNode) {
  const displayed = Math.ceil(readingNode.minutes);
  return `${displayed} мин.`;
}

class PostList extends React.Component {
  render() {
    return (
      <main className={`container ${style.list}`}>
        {this.props.posts.map(({ node }) => {
          const title = node.frontmatter.title;
          const slug = node.fields.slug;
          const readingTime = readingTimeStr(node.fields.readingTime);
          const previewImg = node.frontmatter.img;
          const preview = previewImg && previewImg.childImageSharp.fluid.src;
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
      </main>
    );
  }
}

class Post extends React.Component {
  render() {
    const { slug, preview, title, excerpt, readingTime, date } = this.props;

    return (
      <article key={slug} className={style.article}>
        <header className={style.header}>
          <span className={style.header_meta}>
            {date} — {readingTime}
          </span>
          <h2 className={style.header_title}>
            <Link to={slug}>{title}</Link>
          </h2>
        </header>

        <section className={style.section}>
          <figure className={style.thumbnail}>
            <Link to={slug}>
              <img src={preview} alt={title} />
            </Link>
          </figure>

          <p dangerouslySetInnerHTML={{ __html: excerpt }} />

          <div className={style.readMore}>
            <Link to={slug}>Читать дальше</Link>
          </div>
        </section>
      </article>
    );
  }
}

export default PostList;
