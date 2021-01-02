import React from "react";
import { graphql } from "gatsby";

import PostList from "../components/postList";
import Header from "../components/header";
import Footer from "../components/footer";
import SEO from "../components/seo";
import "../global.scss";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    // const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <div className="wrapper">
        <SEO title="Главная" />
        <Header />
        <PostList posts={posts} />
        <Footer />
      </div>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          fields {
            slug
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
                  maxWidth: 1000
                  maxHeight: 500
                  quality: 90
                ) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;
