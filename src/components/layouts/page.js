import React, { useRef, useEffect, useState } from "react";
import { css } from "@emotion/core";
import { useStaticQuery, graphql } from "gatsby";

import TransitionLink from "gatsby-plugin-transition-link";
import D3Globe from "../svg/d3globe";
import Loader from "react-loader-spinner";

import loadable from '@loadable/component'

//const D3Globe = loadable(() => import("../svg/d3globe"))

const PageLayout = (props) => {
  const data = useStaticQuery(graphql`
    query {
      gD_lite160: file(relativePath: { eq: "img/gD_lite.png" }) {
        childImageSharp {
          fixed(width: 160, height: 160) {
            src
          }
        }
      }
    }
  `);

  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // back path: props.location.state.prevPath

  // isLoaded state
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
            <PageTransitionLink to="/">
              <D3Globe width="80px" silhouetteScale={0.47} />
            </PageTransitionLink>
            <div
              className="text-sm mt-2 select-none text-right font-palanquin"
              css={css`
                a::after {
                  display: inline-block;
                  content: "\\00a0\\00BB";
                }
                a:hover {
                  text-decoration: underline;
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

        <div className="flex flex-col">
          <div
            ref={containerRef}
            className="page-container relative p-2 rounded-lg box-content"
            style={{
              background: "rgba(0,0,0,0.075)",
            }}
          >
            {props.children}

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
    </div>
  );
};

const PageContent = (props) => {
  return (
    <div className="page-content" style={{ width: props.width }}>
      {props.children}
    </div>
  );
};

const PageTransitionLink = (props) => {
  let [prevPath, setPrevPath] = useState(null);

  // set the prev path on render, for back buttons
  useEffect(() => {
    setPrevPath(document.location.pathname);
  }, []);

  return (
    <TransitionLink
      state={{ prevPath, globe: props.globe }}
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

        // get parent page content div
        const container = entry.parentNode.parentNode;
        const exitC = exit.getElementsByClassName("page-content")[0];
        const entryC = entry.getElementsByClassName("page-content")[0];

        // measure widths and heights
        const [oldWidth, oldHeight] = [exitC.offsetWidth, exitC.offsetHeight];
        const [newWidth, newHeight] = [entryC.offsetWidth, entryC.offsetHeight];

        container.classList.add("transitioning");
        container.style.setProperty("width", `${oldWidth}px`);
        container.style.setProperty("height", `${oldHeight}px`);
        container.style.setProperty("transition", `all ${props.duration}s`);

        requestAnimationFrame(() => {
          container.style.setProperty("width", `${newWidth}px`);
          container.style.setProperty("height", `${newHeight}px`);
        });

        setTimeout(() => {
          container.classList.remove("transitioning");
        }, props.duration * 1000);
      }}
      {...props}
    />
  );
};

PageTransitionLink.defaultProps = {
  duration: 2,
};

export default PageLayout;
export { PageTransitionLink };
export { PageContent };
