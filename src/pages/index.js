import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.siteTitle;
  const globeRing = data.globeRing.publicURL;
  const mapDiv = (
    <div
      style={{
        borderRadius: "50%",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
    </div>
  );

  return (
    <Layout>
      <SEO title="home" />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 0.5em"
        }}
      >
        <div
        className="square"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 512,
            maxHeight: 512
          }}
        >
          {mapDiv}
          <div
            style={{
              backgroundImage: `url(${globeRing})`,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundSize: "100% 100%",
            }}
          ></div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    globeRing: file(relativePath: { eq: "img/globe-ring.png" }) {
      publicURL
    }
  }
`;
