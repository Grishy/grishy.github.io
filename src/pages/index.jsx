import React, { Fragment } from "react";
import { graphql } from "gatsby";

import PostList from "../components/postList";
import Header from "../components/header";
import Footer from "../components/footer";
import SEO from "../components/seo";
import "../global.scss";

class BlogIndex extends React.Component {
    render() {
        const { data } = this.props;
        const siteTitle = data.site.siteMetadata.title;
        const posts = data.allMarkdownRemark.edges;

        return (
            <>
                <SEO title="All posts" />
                <Header />
                <PostList posts={posts} />
                {/* <Footer /> */}
            </>
        );
    }
}

export default BlogIndex;

export const pageQuery = graphql`
    query {
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
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        thumbnail {
                            childImageSharp {
                                fluid(cropFocus: CENTER, maxWidth: 700, quality: 90) {
                                    src
                                }
                            }
                        }
                        draft
                    }
                }
            }
        }
    }
`;
