import React from "react";

import PageLayout from "../components/layouts/page";
import SEO from "../components/seo";

import { graphql } from "gatsby";

function Maps(props) {

  return (
    <PageLayout {...props}>
      <SEO title="maps" />
      {props.data.allMapsCsv.nodes.map((m) => {
        return <div key={m.slug}>
          {m.slug}
          </div>;
      })}
    </PageLayout>
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