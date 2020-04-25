import React from "react";
import { css } from "@emotion/core";
import { graphql, useStaticQuery, Link } from "gatsby";

const PageLayout = (props) => {
  const data = useStaticQuery(graphql`
    query {
      gD_lite256: file(relativePath: { eq: "img/gD_lite.png" }) {
        childImageSharp {
          fixed(width: 256, height: 256) {
            src
          }
        }
      }
    }
  `);

  return (
    <div className="w-full md:min-h-screen flex justify-center sm:items-start md:items-center">
      <div className="flex h-full rounded-lg">
        <div className="nav max-h-screen justify-center top-0 flex flex-col sticky pr-4 pl-8 pt-8 pb-8">
          <Link to="/home">
            <img
              alt="geoDavey logo"
              src={data.gD_lite256.childImageSharp.fixed.src}
              style={{ maxWidth: "5rem" }}
            />
          </Link>
          <div
            className="text-sm mt-2 select-none text-right font-palanquin"
            css={css`
              a::after {
                display: inline-block;
                content: "\\00a0\\00BB";
              }
              a:hover {
                background: rgba(255, 255, 255, 0.075);
                text-decoration: underline;
              }
            `}
          >
            <Link
              className="block outline-none whitespace-no-wrap p-1"
              to="/blog"
              activeClassName="font-bold"
            >
              blog
            </Link>
            <Link
              className="block outline-none whitespace-no-wrap p-1"
              to="/maps"
              activeClassName="font-bold"
            >
              maps
            </Link>
            <Link
              className="block outline-none whitespace-no-wrap p-1"
              to="/contact"
              activeClassName="font-bold"
            >
              contact
            </Link>
          </div>
        </div>

        <div className="content relative flex h-full flex-col mr-8 mt-8 mb-8">
          <div
            className="p-2 flex-1 rounded-lg"
            style={{
              width: props.contentWidth,
              minHeight: "calc(100% + 0.875rem)",
              background: "rgba(0,0,0,0.075)",
            }}
          >
            {props.children}
          </div>

          <div
            className="fine-print absolute pb-8 right-0 text-right text-gray-500 text-sm"
            style={{top: "100%"}}
          >
            ¡{" "}
            <Link
              to="/gratitude"
              css={css`
                &:hover {
                  text-decoration: underline;
                }
              `}
            >
              viva la open source
            </Link>{" "}
            !
          </div>
        </div>
      </div>
    </div>
  );
};

PageLayout.defaultProps = {
  contentWidth: 420,
};

export default PageLayout;
