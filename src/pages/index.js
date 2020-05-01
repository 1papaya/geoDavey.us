import React from "react";

import { PageContent } from "../components/layouts/page";
import SEO from "../components/seo";
import { graphql } from "gatsby";

import D3Globe from "../components/svg/d3globe";

function Home(props) {
  return (
    <PageContent width={400}>
      <SEO title="home" />

      <div className="text-3xl leading-6">Test Home Content</div>
      <div className="text-3xl leading-6">Test Home Content</div>
      <div className="text-3xl leading-6">Test Home Content</div>
      <div className="text-3xl leading-6">Test Home Content</div>
      <div className="text-3xl leading-6">Test Home Content</div>
      <div className="text-3xl leading-6">Test Home Content</div>
      <div className="text-3xl leading-6">Test Home Content</div>
      <div className="text-3xl leading-6">Test Home Content</div>
      <div className="text-3xl leading-6">Test Home Content</div>
      <div className="text-3xl leading-6">Test Home Content</div>
      <div className="text-3xl leading-6">Test Home Content</div>

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
