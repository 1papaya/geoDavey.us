import React from "react";
import { css } from "@emotion/core";
import { graphql, useStaticQuery, Link } from "gatsby";

export default ({ children }) => {
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
    <div className="w-full h-full">
      <div className="w-full md:min-h-full flex justify-center sm:items-start md:items-center">
        <div className="flex m-8 rounded-lg">
          <div
            className="flex flex-col self-start sticky mr-4"
            style={{ maxWidth: 80, top: "2rem" }}
          >
            <Link to="/home">
              <img
                alt="geoDavey logo"
                src={data.gD_lite256.childImageSharp.fixed.src}
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

          <div className="flex flex-col">
            <div
              className="p-2 flex-1 rounded-lg"
              style={{
                width: 600,
                minHeight: "calc(100% + 0.875rem)",
                background: "rgba(0,0,0,0.075)",
              }}
            >
              {children}
            </div>

            <div className="text-right text-gray-500 text-sm">
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
    </div>
  );
};
