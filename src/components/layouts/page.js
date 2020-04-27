import React, { useRef, useEffect, useState } from "react";
import { css, Global } from "@emotion/core";
import ReactDOM from "react-dom";
import { Link, useStaticQuery, graphql } from "gatsby";

import TransitionLink from "gatsby-plugin-transition-link";

import Loader from "react-loader-spinner";

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

  const contentRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // back path: props.location.state.prevPath

  // isLoading state
  useEffect(() => {
    // if page is loaded not via transition
    if (!("mount" in props)) setIsLoaded(true);
    // if page is loaded by transition, set isLoaded=true when loading finished
    else setIsLoaded(props.transitionStatus === "entered" && props.mount);
  }, [props.transitionStatus]);

  return (
    <div
      className="w-full md:min-h-screen flex justify-center sm:items-start md:items-center"
      style={{
        background: "#f5f3f0",
      }}
    >
      {!isLoaded && (
        <Loader className="gdv-loader" type="TailSpin" color="#ccc" />
      )}
      <div className="flex h-full rounded-lg m-8">
        <div
          className="nav max-h-screen justify-center top-0 flex flex-col sticky pr-4"
          style={{
            maxHeight: "calc(100vh - 4rem)",
            top: "2rem",
          }}
        >
          <div>
            <PageTransitionLink to="/home">
              <img
                alt="geoDavey logo"
                src={data.gD_lite256.childImageSharp.fixed.src}
                style={{ maxWidth: "5rem" }}
              />
            </PageTransitionLink>
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
              <PageTransitionLink
                className="block outline-none whitespace-no-wrap p-1"
                to="/blog"
                activeClassName="font-bold"
              >
                blog
              </PageTransitionLink>
              <PageTransitionLink
                className="block outline-none whitespace-no-wrap p-1"
                to="/maps"
                activeClassName="font-bold"
              >
                maps
              </PageTransitionLink>
              <PageTransitionLink
                className="block outline-none whitespace-no-wrap p-1"
                to="/contact"
                activeClassName="font-bold"
              >
                contact
              </PageTransitionLink>
            </div>
          </div>
        </div>

        <div className="relative flex h-full flex-col">
          <div
            className="page-content p-2 rounded-lg"
            ref={contentRef}
            style={{
              width: props.contentWidth,
              background: "rgba(0,0,0,0.075)",
              transition: "all 2s",
            }}
          >
            {props.children}
          </div>

          <div
            className="fine-print absolute right-0 text-right text-gray-500 text-sm"
            style={{ top: "100%" }}
          >
            ¡{" "}
            <PageTransitionLink
              css={css`
                &:hover {
                  text-decoration: underline;
                }
              `}
              to="/gratitude"
            >
              viva la open source
            </PageTransitionLink>{" "}
            !
          </div>
        </div>
      </div>
    </div>
  );
};

PageLayout.defaultProps = {
  contentWidth: 420,
  transitionDuration: 2,
};

const PageTransitionLink = (props) => {
  return (
    <TransitionLink
      state={{ prevPath: document.location.pathname }}
      entry={{
        length: props.duration,
        appearAfter: props.duration,
      }}
      exit={{
        length: props.duration,
      }}
      trigger={async (pages) => {
        // wait for both entry and exit pages to load
        const { node: exit } = await pages.exit;
        const { node: entry } = await pages.entry;

        // get page content div from entry / exit
        const entryC = entry.getElementsByClassName("page-content")[0];
        const exitC = exit.getElementsByClassName("page-content")[0];

        // set explicit height/width for exit page content (for transition)
        exitC.style.setProperty("width", `${exitC.offsetWidth}px`);
        exitC.style.setProperty("height", `${exitC.offsetHeight}px`);
        exitC.innerHTML = "";

        // add global style 'page-transition' with width/height of entry content
        // then apply that style to the exit content, triggering transition to entry size
        ReactDOM.render(
          <Global
            styles={css`
              .page-transition {
                width: ${entryC.offsetWidth}px !important;
                height: ${entryC.offsetHeight}px !important;
              }
            `}
          />,
          exitC,
          () => {
            exitC.classList.add("page-transition");
          }
        );
      }}
      {...props}
    />
  );
};

PageTransitionLink.defaultProps = {
  duration: 2,
};

const BackButton = (props) => {};

export default PageLayout;
export { PageTransitionLink };
