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
    const maxWidth = 420;

    return (
      <Layout>
        <SEO title="home" />
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

              <div
                className="is-hidden is-size-3"
                style={{
                  borderRadius: "2px",
                  position: "absolute",
                  top: "20%",
                  left: "35%",
                  boxShadow2: "1px 1px 2px #000",
                  textShadow2:
                    "0px 0px 2px #fff, 1px 1px 2px #fff, 2px 2px 2px #fff, 3px 3px 2px #fff, -1px -1px 2px #fff",

                  background: "rgba(255,255,255,0.2)",
                }}
              >
                <div
                  className=""
                  style={{
                    borderRadius: "2px",
                    color: "#000",
                    border: "1px solid #fff",
                    padding: "0 10px",
                    margin: "10px",
                    background: "rgba(255,255,255,0.8)",
                  }}
                >
                  enter site
                </div>
              </div>
              <ul
                className="menu is-badscript has-text-centered is-size-4 is-size-5-mobile"
                style={{}}
              >
                <li className="title">gDv</li>
                <li>blog</li>
                <li>contact</li>
                <li><span className="is-size-5" style={{color: "red"}}>&#9829;</span></li>
              </ul>
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
