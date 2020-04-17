import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ description, lang, meta, title }) => {
  const { site, favicon32, favicon64 } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
        favicon32: file(relativePath: { eq: "img/favicon.png" }) {
          childImageSharp {
            fixed(width: 32, height: 32) {
              src
            }
          }
        }
        favicon64: file(relativePath: { eq: "img/favicon.png" }) {
          childImageSharp {
            fixed(width: 64, height: 64) {
              src
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`gDv / %s`}
      link={[
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: favicon32.childImageSharp.fixed.src
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "64x64",
          href: favicon64.childImageSharp.fixed.src
        }
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
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
