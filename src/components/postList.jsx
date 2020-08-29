import React from "react";
import classNames from "classnames/bind";
import { Link } from "gatsby";

import style from "./postList.module.scss";

class PostList extends React.Component {
  render() {
    const posts = this.props.posts;

    return (
      <section className={`container ${style.list}`}>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          const preview =
            node.frontmatter.img && node.frontmatter.img.childImageSharp.fluid.src;

          return (
            <article key={node.fields.slug} className={style.article}>
              <Link to={node.fields.slug} className={style.thumbnail}>
                <figure>

                <img src={preview} alt={title}/>
                </figure>
              </Link>

              <div className={style.content}>
                <Link to={node.fields.slug}>{title}</Link>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </div>
            </article>
          );
        })}
      </section>
    );
  }
}

export default PostList;
