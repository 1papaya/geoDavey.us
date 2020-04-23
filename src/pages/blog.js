import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";

function Blog(props) {
  return (
    <Layout>
    <SEO title="blog" />

    blog
  </Layout>

  )
}

export default Blog;

export const pageQuery = graphql`
  query {
    allCloudinaryMedia {
      nodes {
        secure_url
        public_id
        tags
        context {
          custom {
            alt
            caption
            latlon
          }
        }
      }
    }
  }
`;
