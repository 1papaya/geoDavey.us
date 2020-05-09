import React from "react";

import { PageContent } from "../components/layouts/page";
import Postcard from "../components/postcard";
import SEO from "../components/seo";

import { graphql } from "gatsby";

function Contact(props) {
  return (
    <PageContent width={400}>
      <SEO title="contact" />
      <div style={{ width: "100%" }}>
        <Postcard background={props.data.postcardBg.publicURL} />
      </div>
    </PageContent>
  );
}

export default Contact;

export const pageQuery = graphql`
  query {
    postcardBg: file(relativePath: { regex: ".+/autumn.jpg$/" }) {
      publicURL
    }
  }
`;
