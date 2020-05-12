import React from "react";

import { PageContent, PageTransitionLink } from "../components/layouts/page";
import SEO from "../components/seo";
import MDXContent from "../components/mdx";

import Img from "gatsby-image";
import { graphql } from "gatsby";

export default (props) => {
  let mapNodes = props.data.maps.nodes;

  return (
    <PageContent width={800} className="md:p-1">
      <SEO title="maps" />

      <div className="maps flex flex-col md:flex-row md:flex-wrap">
      {mapNodes.map((p) => {
          let md = p.childMdx;
          let meta = md.frontmatter;

          return (
            <div key={meta.slug} className="post w-full md:p-1 md:w-1/2">
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <Img
                  className="absolute w-full h-full"
                  fluid={meta.image.childImageSharp.fluid}
                  style={{ position: "absolute" }}
                />
                <div className="title absolute bottom-0 w-full">
                  <div className="text-white text-center bg-black bg-opacity-50 font-barlow text-2xl">
                    {meta.title}
                  </div>
                </div>
              </div>
              <div className="flex bg-white p-1">
                <div className="flex items-center text-xs text-gray-800">
                  {meta.tags.join(" ")}
                </div>
                <div className="flex-grow text-xs text-right">
                  <a
                    className="inline-block text-white bg-red-700 pt-1 pb-1 pl-2 pr-2 bg-opacity-75 rounded-md border-1"
                    href={`https://github.com/${meta.github}`}
                    target="_blank"
                  >
                    view source
                  </a>{" "}
                  <PageTransitionLink
                    className="inline-block text-white bg-green-700 pt-1 pb-1 pl-2 pr-2 bg-opacity-75 rounded-md border-1"
                    to={meta.url}
                  >
                    open map
                  </PageTransitionLink>
                </div>
              </div>

              <div className="text-sm bg-white border-t pb-1 pr-1 pl-1">{meta.blurb}</div>
            </div>
          );
        })}
      </div>
    </PageContent>
  );
}

export const pageQuery = graphql`
  query {
    maps: allFile(
      filter: { sourceInstanceName: { eq: "maps_md" }, ext: { eq: ".md" } }
      sort: { fields: childMdx___frontmatter___date, order: DESC }
    ) {
      nodes {
        name
        childMdx {
          body
          frontmatter {
            blurb
            date(formatString: "DD MMMM YYYY")
            slug
            tags
            github
            title
            url
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
