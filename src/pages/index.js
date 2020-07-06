import React from "react";

import { PageContent } from "../components/page";
import SEO from "../components/seo";
import { graphql } from "gatsby";

import Img from "gatsby-image";

function Home(props) {
  return (
    <PageContent width={500}>
      <SEO title="home" />

      <Img className="rounded-lg" fluid={props.data.sundowner.fluid} />

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
      <div className="flex">
        <div className="flex-col p-1 w-1/3">
          <Img className="rounded-lg" fluid={props.data.heart.fluid} />
        </div>
        <div className="flex-col p-1 w-1/3">
          <Img className="rounded-lg" fluid={props.data.heart.fluid} />
        </div>
        <div className="flex-col p-1 w-1/3">
          <Img className="rounded-lg" fluid={props.data.heart.fluid} />
        </div>
      </div>
    </PageContent>
  );
}

export default Home;

export const pageQuery = graphql`
  query {
    sundowner: imageSharp(fluid: { originalName: { eq: "sundowner.jpg" } }) {
      fluid(maxWidth: 500) {
        ...GatsbyImageSharpFluid
      }
    }

    heart: imageSharp(fluid: { originalName: { eq: "shambhalaheart.jpg" } }) {
      fluid(maxWidth: 500) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
