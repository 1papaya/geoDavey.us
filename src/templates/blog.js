import React from "react";
import { PageContent } from "../components/layouts/page";

import { graphql } from "gatsby";
import Img from "gatsby-image";

import "prismjs/themes/prism-solarizedlight.css";

export default ({ data }) => {
  console.log(data);
  const meta = data.markdownRemark.frontmatter;
  const html = data.markdownRemark.html;

  return (
    <PageContent width={520} className="p-0 md:p-2">
      {data.markdownRemark.frontmatter.image && (
        <Img
          className="w-full"
          fluid={data.markdownRemark.frontmatter.image.childImageSharp.fluid}
        />
      )}
      <div className="p-1 md:p-0">
        <div className="text-2xl md:text-3xl font-barlow text-bold">{meta.title}</div>
        <div className="flex text-xs mb-2">
          <div className="flex-grow">tags: <span className="text-gray-700">{meta.tags.join(" ")}</span></div>
          <div className="flex-grow text-right">{meta.date}</div>
        </div>
        <div className="text-sm border-t border-white" dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </PageContent>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        blurb
        date(formatString: "DD MMMM YYYY")
        image {
          childImageSharp {
            fluid(maxWidth: 768) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags
        slug
        title
      }
      html
    }
  }
`;
