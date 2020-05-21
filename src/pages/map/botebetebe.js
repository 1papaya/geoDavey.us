import React, { useState } from "react";

import { PageContent } from "../../components/layouts/page";
import SEO from "../../components/seo";

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
