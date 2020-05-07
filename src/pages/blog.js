import React from "react";

import { PageContent, PageTransitionLink } from "../components/layouts/page";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import Img from "gatsby-image";

function Blog(props) {
  return (
    <PageContent width={500} className="p-0 md:p-2">
      <SEO title="blog" />

      <div className="posts container md:rounded-lg md:overflow-hidden">
          {props.data.blogPosts.nodes.map((p, idx) => {
            const f = p.frontmatter;
            const imgFloat = idx % 2 === 0 ? "float-right" : "float-left";
            const imgMargin = idx % 2 === 0 ? "ml-2" : "mr-2";
            const textAlign = idx % 2 === 0 ? "text-right" : "text-left";
            const bgOpacity = idx % 2 === 0 ? "bg-opacity-75" : "bg-opacity-25";

            return (
              <div
                key={f.slug}
                className={`post bg-white ${bgOpacity} p-2 rounded-sm clear-both`}
              >
                {f.image &&
                <Img
                  className={`${imgFloat} ${imgMargin} w-1/4 `}
                  fluid={f.image.childImageSharp.fluid}
                />}
                <div
                  className={`title ${textAlign} leading-tight font-barlow text-2xl`}
                >
                  <PageTransitionLink to={`/blog/${f.slug}/`}>
                    {f.title}
                  </PageTransitionLink>
                </div>
                <div className={`meta ${textAlign} text-gray-700 mb-1 text-xs`}>
                  {f.date} | {f.tags.join(" ")}
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

export default Blog;

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
