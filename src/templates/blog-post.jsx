import React from "react";
import { Link, graphql } from "gatsby";

import Header from "../components/header";
import Footer from "../components/footer";
import SEO from "../components/seo";
import style from "./blog-post.module.scss";
import "../global.scss";

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;
    const thumbnail = post.frontmatter.img;
    const thumbnailSrc = thumbnail && thumbnail.childImageSharp.fluid.src;

    const cover = {
      thumbnailSrc,
      title: post.frontmatter.title,
      date: post.frontmatter.date,
    };

    return (
      <React.Fragment>
        <SEO
          title={cover.title}
          description={post.frontmatter.description || post.excerpt}
        />

        <Header />

        <main className={`container ${style.main}`}>
            <section dangerouslySetInnerHTML={{ __html: post.html }} />
        </main>

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
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
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        draft
        img {
          childImageSharp {
            fluid(cropFocus: CENTER, maxWidth: 1920, quality: 90) {
              src
            }
          }
        }
      }
    }
  }
`;
