import React from "react";
import loadable from "@loadable/component";

import { Link, graphql } from "gatsby";
import Loader from "react-loader-spinner";

import "../styles/index.scss";

const OLGlobe = loadable(() => import("../components/olglobe"), {
  fallback: null,
});

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isGlobeLoaded: false,
    };
  }
  render() {
    const maxWidth = 480;

    return (
      <div className="w-full h-full">
        {!this.state.isGlobeLoaded && (
          <Loader className="gdv-loader" type="TailSpin" color="#ccc" />
        )}
        <div
          className={
            "splash-container" + (this.state.isGlobeLoaded ? " loaded" : "")
          }
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
              maxWidth: maxWidth,
            }}
          >
            <div
              className="globe"
              style={{
                position: "relative",
              }}
            >
              <OLGlobe
                places={this.props.data.allPlacesJson.edges}
                duration={31000}
                maxWidth={maxWidth}
                onLoad={() => {
                  this.setState({ isGlobeLoaded: true });
                }}
              />
            </div>
          </div>
        </div>
      </div>
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
