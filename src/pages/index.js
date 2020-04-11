import React from "react";
import Loadable from "react-loadable";

import Layout from "../components/layout";
import SEO from "../components/seo";

// TODO loading div in between silhouette & map w/ z-index

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
    this.state = {
      globe: null,
    };
  }
  render() {
    const iconStyle = {
      verticalAlign: "middle",
      marginRight: "0.2em",
      width: "20px",
      height: "20px",
    };

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
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 0.5em",
          }}
        >
          <div
            className="square globe"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 512,
              maxHeight: 512,
            }}
          >
            <div
              ref={this.mapRef}
              style={{
                borderRadius: "50%",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            ></div>
            <div
              style={{
                backgroundImage: `url(${this.props.data.globeRing.publicURL})`,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundSize: "100% 100%",
                zIndex: 9999
              }}
            ></div>
          </div>
          <div
            class="title is-size-5 is-size-6-mobile is-badscript has-text-centered has-text-weight-bold"
            style={{
              marginTop: "8px",
              marginBottom: "4px",
              top: "23%",
              background: "rgba(255,255,255,0)",
              padding: "4px",
              borderRadius: "4px"
            }}
          >
            map &lsaquo;&rsaquo; blog &lsaquo;&rsaquo; projects &lsaquo;&rsaquo; contact
          </div>
        </div>
      </Layout>
    );
  }

  componentDidMount() {
    import("../components/globe").then(({ default: Globe }) => {
      let globe = new Globe({
        target: this.mapRef.current,
        places: this.props.data.allPlacesJson.edges,
        duration: 31000,
      });

      this.setState({
        ...this.state,
        globe,
      });
    });
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
