import React from "react";

import { PageContent } from "../components/page";
import Postcard from "../components/postcard";
import SEO from "../components/seo";

import { graphql } from "gatsby";
import Img from "gatsby-image";

// thanks for checking out the source code!
// mucho love to all <3

export default (props) => {
  return (
    <PageContent width={500}>
      <SEO title="1love" />
      <div className="" style={{ width: "100%" }}>
        <div className="relative">
          <Img className="rounded-lg" fluid={props.data.bg.fluid} />
          <div className="flex mt-2 flex-col md:flex-row">
            <div className="md:flex md:w-7/12 md:items-center text-center">
              <div className="border rounded-lg border-black p-3">
                <div className="font-barlow text-center text-2xl md:text-xl">
                  This website is made with
                </div>
                <div className="font-barlow text-center text-3xl md:text-2xl">
                  100% Open Source Software!
                </div>
              </div>
            </div>
            <div className="text-center w-64 text-sm mt-4 mx-auto md:m-0 md:w-5/12 md:leading-snug md:flex md:flex-col md:items-right md:justify-center md:text-right">
              <div className="">
                thank you to the FOSSGIS community &amp; everyone for making this site possible!
              </div>
              <div className="mt-3 md:mt-2">¡viva la open source! 1love</div>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export const pageQuery = graphql`
  query {
    bg: imageSharp(fluid: { originalName: { eq: "shambhalaheart.jpg" } }) {
      fluid(maxWidth: 500) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
