import React, { useState } from "react";

import MapLayout from "../../components/layouts/map";
import SEO from "../../components/seo";

import { point, featureCollection } from "@turf/helpers";
import { graphql } from "gatsby";

// todo::: export a "metadata" variable with name, description, photo URL, ..., for importing into the /maps/ overview page template

function GeomediaMap(props) {
  let [geomedias, setGeomedia] = useState(
    cloudinaryToGeoJSON(props.data.allCloudinaryMedia)
  );

  return (
    <MapLayout>
      <SEO title="geoMedia" />
      <div className="geoDavey-map">
        <div className="map">mapGL</div>
        <div className="sidebar">
          <div className="section">
            <div className="heading">geophotos</div>
            <div className="content geophotos">
              {geomedias.features.map((f) => {
                return (
                  <div key={f.properties.public_id}>
                    <img alt={f.properties.name} src={f.properties.thumbURL} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </MapLayout>
  );
}

function cloudinaryToGeoJSON(allCloudinaryMedia) {
  // turn graphQL response into GeoJSON

  var geomediaFeatures = allCloudinaryMedia.nodes.map((n) => {
    let photoURL = cloudinaryURL(n["public_id"], "w_768,g_auto");
    let thumbURL = cloudinaryURL(
      n["public_id"],
      "w_256,ar_1:1,c_fill,g_auto"
    );

    let properties = {
      public_id: n["public_id"],
      alt: n["context"]["custom"]["alt"],
      caption: n["context"]["custom"]["caption"],
      thumbURL: thumbURL,
      photoURL: photoURL,
      tags: n["tags"],
    };

    // create feature point geometry
    let latlon = n["context"]["custom"]["latlon"].split(",").map((l) => {
      return parseFloat(l);
    });

    return point(latlon, properties);
  });

  return featureCollection(geomediaFeatures);
}

function cloudinaryURL(id, transformations = "q_auto,f_auto") {
  return `https://res.cloudinary.com/geodavey/image/upload/${transformations}/${id}.jpg`;
}

export default GeomediaMap;

export const pageQuery = `
`;