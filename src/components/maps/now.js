import React, { useState, useRef, useEffect } from "react";

import { MapContent } from "../layouts/page";
import SEO from "../seo";

import PyreneesMap from "@geodavey/gl-pyrenees";
import { connect } from "react-redux";
import { graphql } from "gatsby";

const mapStateToProps = ({ isLoadingSuppressed }) => {
  return { isLoadingSuppressed };
};

export default connect(mapStateToProps)((props) => {
  let mapRef = useRef();

  // if loading is suppressed by user, fire fake loading event
  // will cause map controls to render even before real load
  useEffect(() => {
    if (props.isLoadingSuppressed && mapRef.current) {
      mapRef.current.getMap().fire("load", { fake: true });
    }
  }, [props.isLoadingSuppressed])

  return (
    <MapContent>
      <PyreneesMap
        ref={mapRef}
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
        onLoad={(e) => props.dispatch({ type: "TRANSITION_END" })}
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
