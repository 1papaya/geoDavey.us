import React from "react";

import { PageContent, PageTransitionLink } from "../components/layouts/page";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import { css } from "@emotion/core";
import Img from "gatsby-image";
import BackgroundSlider from "gatsby-image-background-slider";

function Projects(props) {
  return (
    <PageContent width={900} className="p-0">
      <SEO title="blog" />

      <div className="posts md:grid md:grid-cols-2">
        <div className="md:row-span-2">
          <div className="md:p-2">
            <div
              className="text-sm relative h-full md:min-h-auto"
              style={{ minHeight: 320 }}
            >
              <BackgroundSlider
                className="absolute w-full h-full"
                initDelay={12}
                query={props.data}
                duration={8}
              ></BackgroundSlider>
            </div>
          </div>
        </div>
        {props.data.blogPosts.nodes.map((p, idx) => {
          const f = p.frontmatter;

          // mobile
          let imgMargin = idx % 2 === 0 ? "ml-2" : "mr-2";
          let textAlign = idx % 2 === 0 ? "text-right" : "text-left";
          let imgFloat = idx % 2 === 0 ? "float-right" : "float-left";
          let bgOpacity = idx % 2 === 0 ? "bg-opacity-25" : "bg-opacity-75";

          // desktop
          textAlign += " md:text-left";
          imgMargin += " md:ml-0 md:mr-2";
          imgFloat += " md:float-left";
          bgOpacity +=
            (idx + 1) % 4 in [0, 1] ? " md:bg-opacity-50" : " md:bg-opacity-75";
          //bg opacity

          return (
            <div
              key={f.slug}
              className={`post bg-white ${bgOpacity} p-2 rounded-sm`}
            >
              <div className={`${imgFloat} ${imgMargin} w-1/3 md:w-1/3`}>
                {f.image && (
                  <PageTransitionLink to={`/blog/${f.slug}/`}>
                    <Img
                      className={`w-full`}
                      fluid={f.image.childImageSharp.fluid}
                    />
                  </PageTransitionLink>
                )}
              </div>
              <div
                className={`title ${textAlign} leading-tight font-barlow text-xl md:text-2xl`}
              >
                <PageTransitionLink to={`/blog/${f.slug}/`}>
                  {f.title}
                </PageTransitionLink>
              </div>
              <div className={`meta ${textAlign} text-gray-700 mb-1 text-xs`}>
                {f.tags.join(" ")}
              </div>
              <div className="blurb leading-snug text-sm">{f.blurb}</div>
              <div className="clear-both"></div>
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
    backgrounds: allFile(
      sort: { fields: relativePath, order: ASC }
      filter: { sourceInstanceName: { eq: "battlestations" } }
    ) {
      nodes {
        relativePath
        childImageSharp {
          fluid(maxWidth: 4000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }

    blogPosts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          blurb
          image {
            childImageSharp {
              fluid(maxWidth: 512, maxHeight: 512) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          slug
          tags
          title
          date(formatString: "DD MMM YYYY")
        }
      }
    }
  }
`;
