import React, { useState } from "react";

import { PageContent } from "../layouts/page";
import SEO from "../seo";

import { graphql } from "gatsby";

export default (props) => {
    return (
      <PageContent>
        <SEO title="botebetebe" />
        Skooo Bufff
      </PageContent>
    );
  };

export const pageQuery = ``;
