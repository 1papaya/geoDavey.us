import React from "react";
import { PageContent } from "../components/layouts/page";

import { graphql } from "gatsby";
import Img from "gatsby-image";

export default ({ data }) => {
  const meta = data.markdownRemark.frontmatter;
  const html = data.markdownRemark.html;

  return (
    <PageContent width={480}>
      <Img fluid={data.markdownRemark.image.childImageSharp.fluid} />
      <div className="text-3xl text-bold">{meta.title}</div>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </PageContent>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        blurb
        date
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
