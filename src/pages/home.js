import React from "react";

import PageLayout from "../components/layouts/page";
import SEO from "../components/seo";

//import OLGlobe from "../components/olglobe";
import D3Globe from "../components/svg/d3globe";

function Home(props) {
  return (
    <PageLayout width={400} {...props}>
      <SEO title="home" />

      <D3Globe width="100%" />
      {/* <OLGlobe
        places={props.data.allWaypointsCsv.edges}
        duration={31000}
        maxWidth="100%"
        onLoad={() => {}}
      /> */}
    </PageLayout>
  );
}

export default Home;

export const pageQuery = graphql`
  query {
    allWaypointsCsv {
      edges {
        node {
          address
          x
          y
        }
      }
    }
  }
`;
