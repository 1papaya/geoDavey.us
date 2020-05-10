import React, { useState } from "react";

import { PageContent } from "../components/layouts/page";
import SEO from "../components/seo";

import { graphql } from "gatsby";

export default (props) => {
    return (
      <PageContent>
        <SEO title="geoMedia" />
        <div className="geoDavey-map">
          <div className="map">mapGL</div>
          <div className="sidebar">
            <div className="section">
              <div className="heading">sup</div>
            </div>
          </div>
        </div>
      </PageContent>
    );
  };

export const pageQuery = ``;
