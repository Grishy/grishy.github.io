import React from "react";
// import classNames from "classnames/bind";
import { Link } from "gatsby";

import style from "./postList.module.scss";

class PostList extends React.Component {
  render() {
    return (
      <section className={style.list}>
        {this.props.posts.map(({ node }) => {
          const title = node.frontmatter.title;
          const slug = node.fields.slug;
          const preview = node.frontmatter.img && node.frontmatter.img.childImageSharp.fluid.src;
          const excerpt = node.frontmatter.description || node.excerpt;

          return <Post title={title} preview={preview} excerpt={excerpt} slug={slug} />;
        })}
      </section>
    );
  }
}

class Post extends React.Component {
  render() {
    const { slug, preview, title, excerpt } = this.props;

    return (
      <article key={slug} className={style.article}>
        <Link to={slug} className={style.thumbnail}>
          <figure>
            <img src={preview} alt={title} />
          </figure>
        </Link>

        <div className={style.content}>
          <Link to={slug}>{title}</Link>
          <p dangerouslySetInnerHTML={{ __html: excerpt }} />
        </div>
      </article>
    );
  }
}

export default PostList;
