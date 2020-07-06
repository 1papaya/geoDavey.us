import React from "react";

import { PageContent, PageTransitionLink } from "../components/page";
import SEO from "../components/seo";

export default () => {
  return (
    <PageContent>
      <SEO title="404" />
      <div className="text-xl font-badscript">404</div>
      <div>page not found :(</div>
      <div>
        <PageTransitionLink to="/">
          &laquo; go back to homepage &laquo;
        </PageTransitionLink>
      </div>
    </PageContent>
  );
};
