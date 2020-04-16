import React from "react";
import loadable from "@loadable/component";

import Layout from "../components/layout";
import SEO from "../components/seo";

// TODO loading div in between silhouette & map w/ z-index
// TODO make splash a component

import IndexStyle from "../styles/index.scss";

const OLGlobe = loadable(() => import("../components/olglobe"), {
  fallback: <div>loading...</div>,
});

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isGlobeLoaded: false,
    };
  }
  render() {
    const iconStyle = {
      verticalAlign: "middle",
      marginRight: "0.2em",
      width: "20px",
      height: "20px",
    };

    const maxWidth = 520;

    return (
      <Layout>
        <SEO title="home" />
        <div
          className={"splash-container" + (this.state.isGlobeLoaded ? " loaded" : "")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 0.5em",
          }}
        >
          <div
            className="splash"
            style={{
              width: "100%",
              maxWidth: maxWidth
            }}
          >
            <div
              className="globe"
              style={{
                position: "relative"
              }}
            >
              <OLGlobe
                places={this.props.data.allPlacesJson.edges}
                duration={31000}
                maxWidth={maxWidth}
                onLoad={() => {this.setState({isGlobeLoaded: true})}}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

    allPlacesJson {
      edges {
        node {
          address
          x
          y
        }
      }
    }

    globeRing: file(relativePath: { eq: "img/globe-ring.png" }) {
      publicURL
    }

    githubIcon: file(relativePath: { eq: "img/icons/github.png" }) {
      publicURL
    }

    emailIcon: file(relativePath: { eq: "img/icons/email.png" }) {
      publicURL
    }

    osmIcon: file(relativePath: { eq: "img/icons/osm.png" }) {
      publicURL
    }
  }
`;
