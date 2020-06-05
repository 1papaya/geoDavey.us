import React, { useState } from "react";

import { MapContent } from "../../components/layouts/page";
import SEO from "../../components/seo";

import PyreneesMap from "@1papaya/gl-pyrenees";
import { graphql } from "gatsby";

export default (props) => {
  return (
    <MapContent>
      <SEO title="pyrenees" />
      <PyreneesMap
        data={{
          tracks: {
            type: "FeatureCollection",
            features: props.data.allTracks.nodes,
          },
          updates: {
            type: "FeatureCollection",
            features: props.data.allUpdates.nodes,
          },
        }}
        dataBaseURL="https://gl-pyrenees.geodavey.us"
      />
    </MapContent>
  );
};

export const pageQuery = graphql`
  query {
    allUpdates {
      nodes {
        type
        properties {
          caption
          photo
          id
          time
        }
        geometry {
          coordinates
          type
        }
      }
    }
    allTracks {
      nodes {
        geometry {
          coordinates
          type
        }
        type
      }
    }
  }
`;
