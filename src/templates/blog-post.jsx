import React from "react";
import { Link, graphql } from "gatsby";

import Header from "../components/header";
import Footer from "../components/footer";
import SEO from "../components/seo";
import style from "./blog-post.module.scss";
import "../global.scss";

function readingTimeStr(readingNode) {
  const displayed = Math.ceil(readingNode.minutes);
  return `${displayed} мин.`;
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { previous, next } = this.props.pageContext;
    const thumbnail = post.frontmatter.img;
    const thumbnailSrc = thumbnail && thumbnail.childImageSharp.fluid.src;
    const readingTime = readingTimeStr(post.fields.readingTime);

    return (
      <React.Fragment>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />

        <Header />

        <main className={style.main}>
          <header>
            <div className={style.meta}>
              <time>{post.frontmatter.date}</time> — {readingTime}
            </div>

            <h1 className={style.title}>{post.frontmatter.title}</h1>
          </header>

          <img
            className={style.thumbnail}
            src={thumbnailSrc}
            alt={post.frontmatter.title}
          />

          <section
            className={`container ${style.post}`}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </main>

        <div className={style.paginator}>
          {previous && (
            <Link
              to={previous.fields.slug}
              rel="prev"
              className={style.paginator__prev}
            >
              ← {previous.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link
              to={next.fields.slug}
              rel="next"
              className={style.paginator__next}
            >
              {next.frontmatter.title} →
            </Link>
          )}
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        readingTime {
          minutes
        }
      }
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY", locale: "ru")
        img {
          childImageSharp {
            fluid(
              cropFocus: CENTER
              maxWidth: 1600
              maxHeight: 800
              quality: 90
            ) {
              src
            }
          }
        }
      }
    }
  }
`;
