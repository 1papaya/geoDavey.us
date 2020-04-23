import React, { useState, useEffect } from "react";

import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

import LinesSVG from "../components/svg/lines";

import "../styles/home.scss";

function Home(props) {
  return (
    <Layout>
      <SEO title="home" />

      <div className="w-full h-full flex justify-center items-center">
        <div
          className="rounded-lg overflow-hidden"
          style={{
            width: 768,
            height: 500,
            background: "rgba(255,255,255,0.5)",
          }}
        >
          <LinesSVG colors={["#b03d66", "#383455", "#fa6620", "#00a694", "#ee3449"]} />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
