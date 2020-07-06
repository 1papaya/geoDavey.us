import React from "react";
import { PageContent } from "../components/page";
import MDXContent from "../components/mdx";

import { graphql } from "gatsby";
import Img from "gatsby-image";

export default ({ data }) => {
  const meta = data.mdx.frontmatter;
  const body = data.mdx.body;

  return (
    <PageContent width={520} className="p-0 md:p-2">
      {meta.image && (
        <div className="w-full mb-2">
          <Img className="w-full" fluid={meta.image.childImageSharp.fluid} />
          <div className="text-xs md:text-sm text-center text-gray-700">pic: {meta.caption}</div>
        </div>
      )}
      <div className="p-1 md:p-0">
        <div className="">
          <div className="font-barlow text-bold text-2xl md:text-3xl leading-none">{meta.title}</div>
          <div className="md:text-md text-gray-900">{meta.subtitle}</div>          
        </div>
        <div className="flex text-xs  mb-2">
          <div className="flex-grow">
            tags: <span className="text-gray-700">{meta.tags.join(" ")}</span>
          </div>
          <div className="flex-grow text-right">{meta.date}</div>
        </div>
        <div className="text-sm pt-2 border-t border-white">
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
        subtitle
      }
      body
    }
  }
`;
