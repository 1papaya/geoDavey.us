import React from "react";

import PageLayout from "../components/layouts/page";
import SEO from "../components/seo";
import { graphql } from "gatsby";

function Blog(props) {
  return (
    <PageLayout>
      <SEO title="blog" />

      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
      <div className="text-2xl leading-6">This is pretty very cool, no?</div>
    </PageLayout>
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
  }
`;
