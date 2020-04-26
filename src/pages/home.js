import React from "react";

import PageLayout from "../components/layouts/page";
import SEO from "../components/seo";

function Home(props) {
  return (
    <PageLayout {...props}>
      <SEO title="home" />

      <div className="font-badscript">skoobuufff</div>
    </PageLayout>
  );
}

export default Home;