import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Globe from "../components/globe";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.data = props.data;
    this.mapRef = React.createRef();
  }
  render() {
    const globeRing = this.data.globeRing.publicURL;

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
  }

  componentDidMount() {
    const globe = new Globe({
      target: this.mapRef.current,
      places: [
        { id: "0", address: "Denver, CO, USA", x: "-104.9903", y: "39.7392" },
        { id: "1", address: "Boston, MA, USA", x: "-71.0589", y: "42.3601" },
        { id: "2", address: "Mbabane, Eswatini", x: "31.1367", y: "-26.3054" },
        { id: "3", address: "Heidelberg, Germany", x: "8.6724", y: "49.3988" },
        { id: "4", address: "Alcudia, Spain", x: "3.124", y: "39.8533" },
        { id: "5", address: "Vilaflor, Spain", x: "-16.6372", y: "28.1578" },
      ],
    });

    globe.animate(31000);
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
    globeRing: file(relativePath: { eq: "img/globe-ring.png" }) {
      publicURL
    }
  }
`;
