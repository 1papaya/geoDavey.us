import React from "react";

import TransitionLink from "gatsby-plugin-transition-link";
import { css, Global } from "@emotion/core";
import ReactDOM from "react-dom";
import { useStaticQuery, Link } from "gatsby";

function Nav(props) {
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

  const duration = 2;

  const entryAnim = { length: duration, appearAfter: duration+0.1 };
  const exitAnim = { length: duration };

  const trig = async (pages) => {
    const exit = await pages.exit;
    const entry = await pages.entry;

    const entryContent = entry.node.getElementsByClassName("content")[0];
    const exitContent = exit.node.getElementsByClassName("content")[0];

    exitContent.classList.add("transition");
    exitContent.innerHTML = "";

    window.requestAnimationFrame(() => {
      ReactDOM.render(
        <Global
          styles={css`
            .transition {
              width: ${entryContent.offsetWidth}px !important;
              height: ${entryContent.offsetHeightt}px !important;
            }
          `}
        />,
        exitContent,
        () => {
          exitContent.classList.add("transition");
        }
      );
    });
  };

  return (
    <div className="nav max-h-screen justify-center top-0 flex flex-col sticky pr-4 pl-8 pt-8 pb-8">
      <div>
        <TransitionLink
          entry={entryAnim}
          exit={exitAnim}
          trigger={trig}
          to="/home"
        >
          <img
            alt="geoDavey logo"
            src={data.gD_lite256.childImageSharp.fixed.src}
            style={{ maxWidth: "5rem" }}
          />
        </TransitionLink>
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

            a {
                display: block;
            }
          `}
        >
          <TransitionLink
            entry={entryAnim}
            exit={exitAnim}
            trigger={trig}
            className="block outline-none whitespace-no-wrap p-1"
            to="/blog"
            activeClassName="font-bold"
          >
            blog
          </TransitionLink>
          <TransitionLink
            entry={entryAnim}
            exit={exitAnim}
            trigger={trig}
            className="block outline-none whitespace-no-wrap p-1"
            to="/maps"
            activeClassName="font-bold"
          >
            maps
          </TransitionLink>
          <TransitionLink
            entry={entryAnim}
            exit={exitAnim}
            trigger={trig}
            className="block outline-none whitespace-no-wrap p-1"
            to="/contact"
            activeClassName="font-bold"
          >
            contact
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}

export default Nav;
