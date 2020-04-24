import React from "react";

import Layout from "../components/layouts/page";
import SEO from "../components/seo";

function Maps(props) {

  console.log(props.data);
  return (
    <Layout>
      <SEO title="maps" />
      {props.data.allSitePage.nodes.map((m) => {
        return <div key={m.path}>{m.path}</div>;
      })}
      maps
    </Layout>
  );
}

export default Maps;

export const pageQuery = graphql`
  query {
    allSitePage(filter: { path: { regex: "/\/maps\/.+/" } }) {
      nodes {
        path
        fields {
          name
          slug
          desc
          tools
        }
      }
    }
  }
`;
