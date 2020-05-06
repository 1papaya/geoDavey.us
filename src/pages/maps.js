import React from "react";

import { PageContent } from "../components/layouts/page";
import SEO from "../components/seo";
import { css } from "@emotion/core";

import Img from "gatsby-image";
import { graphql } from "gatsby";

function Maps(props) {
  console.log(props.data);

  return (
    <PageContent width={600}>
      <SEO title="maps" />

      <div
        className="maps flex flex-col md:flex-row md:flex-wrap"
        css={css`
          & > .map {
            min-width: 50%;
          }
        `}
      >
        {props.data.allMapsCsv.nodes.map((m) => {
          const img = props.data.allFile.nodes.find((f) => {
            return f.base === `${m.slug}.png`;
          });

          return (
            <div key={m.slug} className="map relative flex">
              <div className="w-full">
                <Img key={m.slug} fluid={img.childImageSharp.fluid} />
              </div>
              <div className="w-full absolute bottom-0">{m.name}</div>
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

    allFile(filter: { relativePath: { regex: "/^img/maps/.+/" } }) {
      nodes {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
        base
      }
    }
  }
`;
