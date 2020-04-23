import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";


class Blog extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.data);

    this.state = {};
  }

  getGeophotosGeoJSON(allCloudinaryMedia) {
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
