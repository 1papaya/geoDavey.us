import React from "react";

import { PageContent } from "../components/layouts/page";
import SEO from "../components/seo";

import { graphql } from "gatsby";

function Maps(props) {
  return (
    <PageContent width={600}>
      <SEO title="maps" />

      <div className="flex flex-wrap">
        {props.data.allMapsCsv.nodes.map((m) => {
          return (
            <div key={m.slug}>
              Sko Buffs
              <img src={`/assets/img/${m.slug}.png`} />
            </div>
          );
        })}
      </div>
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
