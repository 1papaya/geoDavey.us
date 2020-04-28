import React from "react";

import PageLayout from "../components/layouts/page";
import Postcard from "../components/postcard";
import SEO from "../components/seo";

import { graphql } from "gatsby";

function Contact(props) {
  return (
    <PageLayout width={480} {...props}>
      <SEO title="contact" />

      <div style={{ width: "100%" }}>
        <Postcard background={props.data.postcardBg.publicURL} />
      </div>
    </PageLayout>
  );
}

export default Contact;

export const pageQuery = graphql`
  query {
    postcardBg: file(relativePath: { eq: "img/autumn.jpg" }) {
      publicURL
    }
  }
`;
