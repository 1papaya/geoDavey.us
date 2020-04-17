import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

import BlogStyle from "../styles/blog.scss";

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {

    return (
      <Layout>
        <SEO title="home" />
        TESSSSSTTTT BLOOGGGG
      </Layout>
    );
  }
}

export default Blog;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
