import React, { useState } from "react";

import { MapContent } from "../../components/layouts/page";
import SEO from "../../components/seo";

import { graphql } from "gatsby";

export default (props) => {
    return (
      <MapContent>
        <SEO title="pyrenees" />
        Skooo Bufff
      </MapContent>
    );
  };

export const pageQuery = ``;
