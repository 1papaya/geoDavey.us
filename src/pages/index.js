import React from "react";

import { PageContent } from "../components/layouts/page";
import SEO from "../components/seo";
import { graphql } from "gatsby";

import Img from "gatsby-image"

import { PageTransitionLink } from "../components/layouts/page";

import D3Globe from "../components/svg/d3globe";

function Home(props) {
  console.log(props.data);
  return (
    <PageContent width={500}>
      <SEO title="home" />

      <Img fluid={props.data.sundowner.fluid} />

      <div className="flex">
        <div className="flex flex-col m-4 md:flex-row">
          <div className="text-3xl text-center underline md:no-underline font-badscript">
            welcome to geoDavey.us
          </div>
          <div className="flex mt-3 md:mt-0 md:ml-3 md:items-center text-center">
            This website has stuff related to open source geospatial software,
            planet Earth, and adventures therein. Thanks for visiting! :)
          </div>
        </div>
      </div>
    </PageContent>
  );
}

export default Home;

export const pageQuery = graphql`
  query {
    allWaypointsCsv {
      edges {
        node {
          address
          x
          y
        }
      }
    }
    sundowner: imageSharp(fluid: {originalName: {eq: "sundowner.jpg"}}) {
      fluid(maxWidth: 500) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
