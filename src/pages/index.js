import React from "react";
import loadable from "@loadable/component";

import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

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
              <ul
                className="menu is-badscript has-text-centered is-size-4 is-size-5-mobile"
                style={{}}
              >
                <li className="title">gDv</li>
                <li><Link to="/map">map</Link></li>
                <li><Link to="/blog">blog</Link></li>
                <li><span className="is-size-5" style={{color: ""}}>&#9829;&#xFE0E;</span></li>
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
