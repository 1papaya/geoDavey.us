import React from "react";
import Loadable from "react-loadable";

import Layout from "../components/layout";
import SEO from "../components/seo";

class Index extends React.Component {
  constructor(props) {
    super(props);
    
    this.mapRef = React.createRef();
    this.state = {
        globe: null
    }
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
              }}
            ></div>
          </div>
          <div
            className="title is-size-3 is-size-4-mobile is-badscript has-text-centered has-text-weight-bold"
            style={{ marginTop: "8px", marginBottom: "4px" }}
          >
            <span className="upside-down">!</span> viva la open source !
          </div>
          <div
            className="contact columns is-mobile has-text-centered"
            style={{ minWidth: "280px" }}
          >
            <div className="column is-narrow">
              <a href="http://github.com/1papaya">
                <img style={iconStyle} src={this.props.data.githubIcon.publicURL} />
                1papaya
              </a>
            </div>
            <div className="column">
              <a href="mailto:me@geoDavey.us">
                <img style={iconStyle} src={this.props.data.emailIcon.publicURL} />
                me@geodavey.us
              </a>
            </div>
            <div className="column is-narrow">
              <a href="https://openstreetmap.org/user/mDav">
                <img style={iconStyle} src={this.props.data.osmIcon.publicURL} />
                mDav
              </a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  componentDidMount() {
      import("../components/globe").then(( {default: Globe} ) => {
          let globe = new Globe({
            target: this.mapRef.current,
            places: this.props.data.allPlacesJson.edges,
            duration: 31000
          })

          this.setState({
              ...this.state,
              globe
          })
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
