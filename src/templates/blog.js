import React from "react";
import PageLayout from "../components/layouts/page";

import { graphql } from "gatsby";

export default ({ data }) => {
  const meta = data.markdownRemark.frontmatter;
  const html = data.markdownRemark.html;

  return (
    <PageLayout width={480}>
      <div className="text-3xl text-bold">{meta.title}</div>
      <div dangerouslySetInnerHTML={{__html: html}}></div>
    </PageLayout>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        blurb
        date
        image
        tags
        slug
        title
      }
      html
    }
  }
`;
