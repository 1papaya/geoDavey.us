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

      <div className="w-full md:h-full flex justify-center sm:items-start md:items-center">
        <div className="flex rounded-lg">
          <div className="flex flex-col mr-4" style={{ maxWidth: 80 }}>
            <img src={props.data.gD_lite256.childImageSharp.fixed.src} />
            <div className="text-sm mt-2 text-right font-palanquin">
              <div className="p-1">home &raquo;</div>
              <div className="p-1 hover:cursor-pointer">blog &raquo;</div>
              <div className="p-1 hover:cursor-pointer">projects &raquo;</div>
              <div className="p-1">contact &raquo;</div>
              <div className="p-1 hover:cursor-pointer">&lt;3 &raquo;</div>
            </div>
          </div>

          <div
            className="flex flex-wrap relative rounded-lg overflow-hidden"
            style={{
              width: 512,
              background: "rgba(0,0,0,0.075)"
            }}
          >
            <div className="flex-auto" style={{ minHeight: 300 }}></div>
            <div className="flex-auto w-full p-2">
              <div className="text-2xl font-badscript">blog</div>
            </div>
            <div className="flex-auto w-full"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;

export const pageQuery = graphql`
  query {
    gD_lite256: file(relativePath: { eq: "img/gD_lite.png" }) {
      childImageSharp {
        fixed(width: 256, height: 256) {
          src
        }
      }
    }

    heart128: file(relativePath: { eq: "img/heart.png" }) {
      childImageSharp {
        fixed(width: 128, height: 128) {
          src
        }
      }
    }
  }
`;
