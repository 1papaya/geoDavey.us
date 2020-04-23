import React, { useState, useEffect } from "react";

import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

import "../styles/home.scss";

function Home(props) {

  return (
    <Layout>
      <SEO title="home" />
      <div className="flex justify-center">Touch my butt</div>
      
    </Layout>
  )
}

export default Home;
