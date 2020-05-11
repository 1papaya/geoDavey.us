import React from "react";

import { PageContent, PageTransitionLink } from "../components/layouts/page";
import SEO from "../components/seo";
import { graphql } from "gatsby";
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
        {props.data.allProjects.nodes.map((p, idx) => {
          const md = p.childMarkdownRemark;
          const meta = md.frontmatter;

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
              key={meta.slug}
              className={`post bg-white ${bgOpacity} p-2 rounded-sm`}
            >
              <div className={`${imgFloat} ${imgMargin} w-1/3 md:w-1/3`}>
                {meta.image && (
                  <PageTransitionLink to={meta.url}>
                    <Img
                      className={`w-full`}
                      fluid={meta.image.childImageSharp.fluid}
                    />
                  </PageTransitionLink>
                )}
              </div>
              <div
                className={`title ${textAlign} leading-tight font-barlow text-xl md:text-2xl`}
              >
                <PageTransitionLink to={meta.url}>
                  {meta.title}
                </PageTransitionLink>
              </div>
              <div className={`meta ${textAlign} text-gray-700 mb-1 text-xs`}>
                {meta.tags.join(" ")}
              </div>
              <div className="blurb leading-snug text-sm">{meta.blurb}</div>
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
          fluid(maxWidth: 512) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }

    allProjects: allFile(
      filter: { sourceInstanceName: { eq: "projects" }, ext: { eq: ".md" } }
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            blurb
            image {
              childImageSharp {
                fluid(maxWidth: 512, maxHeight: 512) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date(formatString: "DD MMM YYYY")
            slug
            title
            tags
            url
          }
        }
      }
    }
  }
`;
