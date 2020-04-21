import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";

export default () => {
  return (
    <Layout>
      <SEO title="map" />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <div className="is-size-1 is-badscript"><span className="upside-down">!</span> 404 !</div>
        <div style={{ marginTop: "0.5em" }}>page not found :(</div>
        <div style={{ marginTop: "1em" }}><Link to="/">&laquo; go back to homepage &laquo;</Link></div>
      </div>
    </Layout>
  );
}