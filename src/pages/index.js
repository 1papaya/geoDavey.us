import React from "react";

import { PageContent } from "../components/layouts/page";
import SEO from "../components/seo";
import { graphql } from "gatsby";

import D3Globe from "../components/svg/d3globe";

function Home(props) {
  return (
    <PageContent width={500}>
      <SEO title="home" />

      <div className="text-4xl">Bienvenidos a geoDavey.us ! :)</div>
      <div>
        This is a website with a stuff related to open source geospatial
        software and adventures therein. Please welcome to check out the blog,
        see some maps, and drop me a postcard! Mucho love, thank you all!
      </div>
    </PageContent>
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
