import React from "react";
import { PageContent } from "../components/layouts/page";
import MDXContent from "../components/mdx";

import { graphql } from "gatsby";
import Img from "gatsby-image";

export default ({ data }) => {
  const meta = data.mdx.frontmatter;
  const body = data.mdx.body;

  return (
    <PageContent width={570} className="p-0 md:p-2">
      {meta.image && (
        <div className="w-full">
          <Img className="w-full" fluid={meta.image.childImageSharp.fluid} />
          <div className="text-sm text-center text-gray-700 italic">(pic: {meta.caption})</div>
        </div>
      )}
      <div className="p-1 md:p-0">
        <div className="text-2xl md:text-3xl font-barlow text-bold">
          {meta.title}
        </div>
        <div className="flex text-xs  mb-2">
          <div className="flex-grow">
            tags: <span className="text-gray-700">{meta.tags.join(" ")}</span>
          </div>
          <div className="flex-grow text-right">{meta.date}</div>
        </div>
        <div className="text-sm  border-t border-white">
          <MDXContent>{body}</MDXContent>
        </div>
      </div>
    </PageContent>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
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
        caption
        tags
        slug
        title
      }
      body
    }
  }
`;
