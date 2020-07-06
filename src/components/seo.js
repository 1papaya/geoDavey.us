import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ description, meta, title }) => {
  const { site, favicon } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
        favicon: file(relativePath: { regex: "/gD_lite.png$/" }) {
          favicon32: childImageSharp {
            fixed(width: 32, height: 32) {
              src
            }
          }
          favicon64: childImageSharp {
            fixed(width: 64, height: 64) {
              src
            }
          }
        }
      }
    `
  );

  const seoDescription = description || site.siteMetadata.description;
  const seoTitle = title || site.siteMetadata.title;

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={title}
      defaultTitle={"gDv.us"}
      titleTemplate={`gDv: %s`}
      link={[
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: favicon.favicon32.fixed.src,
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "64x64",
          href: favicon.favicon64.fixed.src,
        },
      ]}
      meta={[
        {
          name: `title`,
          content: seoTitle,
        },
        {
          name: `description`,
          content: seoDescription,
        },
        {
          name: "viewport",
          content: "width=device-width; height=device-height; initial-scale=1",
        },
      ].concat(meta)}
    />
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
