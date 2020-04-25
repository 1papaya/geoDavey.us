import React from "react";

import Layout from "../components/layouts/page";
import SEO from "../components/seo";

import { graphql } from "gatsby";

function Maps(props) {

  return (
    <Layout>
      <SEO title="maps" />
      {props.data.allMapsCsv.nodes.map((m) => {
        return <div key={m.slug}>
          {m.slug}
          </div>;
      })}
    </Layout>
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