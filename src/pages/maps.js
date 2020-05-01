import React from "react";

import { PageContent } from "../components/layouts/page";
import SEO from "../components/seo";

import { graphql } from "gatsby";

function Maps(props) {
  return (
    <PageContent width={600}>
      <SEO title="maps" />


      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      <div className="text-xl leading-6">Test Maps Content</div>
      </PageContent>
  );
}

export default Maps;

export const pageQuery = graphql`
  query {
    allMapsCsv {
      nodes {
        name
        slug
        tools
        desc
      }
    }
  }
`;
