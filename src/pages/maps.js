import React from "react";

import { PageContent } from "../components/layouts/page";
import SEO from "../components/seo";
import { css } from "@emotion/core";

import Img from "gatsby-image";
import { graphql } from "gatsby";

function Projects(props) {
  return (
    <PageContent width={900} className="p-1">
      <SEO title="maps" />

      <div
        className="maps flex flex-col md:flex-row md:flex-wrap"
      >
        {props.data.projectPosts.posts.map((p) => {
          let md = p.markdown;
          let meta = p.markdown.frontmatter;

          return (
            <div key={meta.slug} className="post w-full p-1 md:w-1/3">
              <div className="relative w-full" style={{paddingBottom: "66.67%"}}>
                <Img
                  className="absolute w-full h-full"
                  fluid={meta.image.childImageSharp.fluid}
                  style={{position: "absolute"}}
                />
                <div className="title absolute bottom-0 w-full text-white text-center font-barlow text-xl bg-black bg-opacity-50">{meta.title}</div>
              </div>

              <div className="text-sm">{meta.blurb}</div>
            </div>
          );
        })}
      </div>
    </PageContent>
  );
}

export default Projects;

export const pageQuery = graphql`
  query {
    projectPosts: allFile(
      filter: { relativePath: { regex: ".+/projects/(.+).md/" } }
    ) {
      posts: nodes {
        markdown: childMarkdownRemark {
          frontmatter {
            blurb
            date(formatString: "DD MMMM YYYY")
            slug
            tags
            title
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
