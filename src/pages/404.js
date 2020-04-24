import React from "react";

import PageLayout from "../components/layouts/page";
import SEO from "../components/seo";
import { Link } from "gatsby";

export default () => {
  return (
    <PageLayout>
      <SEO title="404" />
        <div className="text-xl font-badscript">404</div>
        <div>page not found :(</div>
        <div><Link to="/">&laquo; go back to homepage &laquo;</Link></div>
    </PageLayout>
  );
}