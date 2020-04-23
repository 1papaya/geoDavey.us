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
            <img
              alt="geoDavey logo"
              src={data.gD_lite256.childImageSharp.fixed.src}
            />
            <div
              className="text-sm mt-2 select-none text-right font-palanquin"
              css={css`
                &>a::after {
                  display: inline-block;
                  content: "\\00a0\\00BB";
                }
              `}
            >
              <Link className="block p-1" to="/home">
                home
              </Link>
              <Link className="block p-1" to="/blog">
                blog
              </Link>
              <Link className="block p-1" to="/projects">
                projects
              </Link>
              <Link className="block p-1" to="/contact">
                contact
              </Link>
              <Link className="block p-1" to="/gratitude">
                &lt;3
              </Link>
            </div>
          </div>

          <div
            className="flex p-2 flex-wrap relative rounded-lg overflow-hidden"
            style={{
              width: 512,
              minHeight: 300,
              background: "rgba(0,0,0,0.075)",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
