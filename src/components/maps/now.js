import React, { useState } from "react";

import { MapContent } from "../layouts/page";
import SEO from "../seo";

import { connect } from "react-redux";
import PyreneesMap from "@1papaya/gl-pyrenees";
import { graphql } from "gatsby";

export default connect()((props) => {
  return (
    <MapContent>
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
        // onLoad={(e) => props.dispatch({ type: "TRANSITION_END" })}
      />
    </MapContent>
  );
});

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
