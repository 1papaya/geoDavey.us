import React from "react";

import { PageContent, PageTransitionLink } from "../components/layouts/page";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import Img from "gatsby-image";

function Projects(props) {
  return (
    <PageContent width={800} className="p-0 md:p-2">
      <SEO title="blog" />

      <div className="posts md:flex md:flex-wrap md:rounded-lg md:overflow-hidden">
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
            (idx + 1) % 4 in [0, 1] ? " md:bg-opacity-75" : " md:bg-opacity-25";
          //bg opacity

          return (
            <div
              key={f.slug}
              className={`post md:w-1/2 bg-white ${bgOpacity} p-2 rounded-sm clear-both`}
            >
              {f.image && (
                <Img
                  className={`${imgFloat} ${imgMargin} w-1/3 md:w-1/3`}
                  fluid={f.image.childImageSharp.fluid}
                />
              )}
              <div
                className={`title ${textAlign} leading-tight font-barlow text-xl md:text-2xl`}
              >
                <PageTransitionLink to={`/blog/${f.slug}/`}>
                  {f.title}
                </PageTransitionLink>
              </div>
              <div className={`meta ${textAlign} text-gray-700 mb-1 text-xs`}>
                {f.date} | {f.tags.join(" ")}
              </div>
              <div className="blurb leading-snug text-sm">{f.blurb}</div>
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
    allCloudinaryMedia {
      nodes {
        secure_url
        public_id
        tags
        context {
          custom {
            alt
            caption
            latlon
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
          date(formatString: "DD MMMM YYYY")
        }
      }
    }
  }
`;
