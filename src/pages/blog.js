import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

import BlogStyle from "../styles/blog.scss";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.data);

    this.state = {};
  }

  getGeophotosGeoJSON(allCloudinaryMedia) {
    var tst = allCloudinaryMedia.nodes.map((n) => {
    })
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
