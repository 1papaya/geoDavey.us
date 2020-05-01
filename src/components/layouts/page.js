import React, { useRef, useEffect, useState } from "react";
import { css } from "@emotion/core";
import { useStaticQuery, graphql } from "gatsby";

import TransitionLink from "gatsby-plugin-transition-link";
import D3Globe from "../svg/d3globe";
import Loader from "react-loader-spinner";

import loadable from "@loadable/component";

//const D3Globe = loadable(() => import("../svg/d3globe"))

const PageLayout = (props) => {
  const contentRef = useRef(null);
  const logoRef = useRef(null);
  const contentParentRef = useRef(null);
  const [isPreloaded, setIsPreloaded] = useState(false);
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

  // splash animation
  useEffect(() => {
    const headerHeight = 48;
    const parent = contentParentRef.current;
    const logo = logoRef.current;
    let [pWidth, pHeight] = [parent.clientWidth, parent.clientHeight];

    if (pHeight < window.innerHeight - headerHeight)
      pHeight = window.innerHeight - headerHeight;

    const pausLength = 4.3;
    const animLength = 1.5;

    // set
    logo.style.setProperty("width", "320px");
    logo.style.setProperty("height", "320px");

    parent.style.setProperty("width", "0px");
    parent.style.setProperty("height", "0px");
    parent.style.setProperty("overflow", "hidden");

    parent.style.setProperty("transition", `all ${animLength}s`);

    setTimeout(() => {
      requestAnimationFrame(() => {
        logo.style.setProperty("transition", `all ${animLength}s`);
        parent.style.setProperty("width", `${pWidth}px`);
        parent.style.setProperty("height", `${pHeight}px`);

        requestAnimationFrame(() => {
          logo.style.removeProperty("height");
          logo.style.removeProperty("width");
        });
      });

      setTimeout(() => {
        parent.style.setProperty("width", "auto");
        parent.style.setProperty("height", "auto");
        parent.style.setProperty("overflow", "visible");

        setIsPreloaded(true);
      }, animLength * 1000);
    }, pausLength * 1000);
  }, []);

  return (
    <div
      className={`flex w-full bg-standard justify-center items-center min-h-screen ${
        isPreloaded ? "" : "preloading"
      }`}
      css={css`
        .fade-in {
          opacity: 1;
          transition: all 1.5s;
        }
        &.preloading {
          overflow: hidden;
          .fade-in {
            opacity: 0;
          }
        }
      `}
    >
      {!isLoaded && (
        <Loader className="gdv-loader" type="TailSpin" color="#ccc" />
      )}
      <div className="flex flex-col md:items-center w-full md:w-auto md:flex-row h-full md:rounded-lg">
        <div className="nav bg-standard flex self-stretch text-center items-stretch md:sticky md:bg-standard md:text-right text-xs md:text-sm md:m-0 sticky md:static z-10 top-0 max-h-screen select-none font-palanquin justify-center md:top-4 md:flex-col sticky">
          <PageTransitionLink
            className="flex overflow-hidden fade-in justify-center md:justify-end items-center outline-none whitespace-no-wrap p-1 md:pt-2 w-2/12 md:w-auto"
            to="/"
            activeClassName="font-bold"
          >
            <span>home</span>
          </PageTransitionLink>

          <PageTransitionLink
            className="flex overflow-hidden fade-in justify-center md:justify-end items-center outline-none whitespace-no-wrap p-1 w-2/12 md:w-auto"
            to="/blog/"
            activeClassName="font-bold"
          >
            <span>blog</span>
          </PageTransitionLink>
          <div className="flex flex-shrink mt-1 mb-1 justify-center md:w-auto md:justify-end">
            <div
              ref={logoRef}
              className="logo md:m-0 relative h-10 w-10 md:w-20 md:h-20"
            >
              <D3Globe
                className="absolute w-full h-full"
                silhouetteScale={0.47}
              />
            </div>
          </div>
          <PageTransitionLink
            className="flex overflow-hidden fade-in justify-center md:justify-end items-center md:justify-right outline-none whitespace-no-wrap p-1 w-2/12 md:w-auto"
            to="/maps/"
            activeClassName="font-bold"
          >
            <span>maps</span>
          </PageTransitionLink>
          <PageTransitionLink
            className="flex overflow-hidden fade-in justify-center md:justify-end items-center outline-none whitespace-no-wrap p-1 w-2/12 md:w-auto"
            to="/contact/"
            activeClassName="font-bold"
          >
            <span>about</span>
          </PageTransitionLink>
        </div>

        <div
          ref={contentParentRef}
          className="flex fade-in flex-col md:justify-center"
        >
          <div
            ref={contentRef}
            className="page-container md:ml-4 md:mt-4 md:mb-4 sm:w-full-minus-important relative p-2 md:rounded-lg box-content"
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
                to="/gratitude/"
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
    <div
      className="page-content sm:w-full-important md:w-auto"
      style={{ width: props.width }}
    >
      {props.children}
    </div>
  );
};

PageContent.defaultProps = {
  width: 420,
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
        const tlEdges = entry.parentNode;
        const container = entry.parentNode.parentNode;
        const exitC = exit.getElementsByClassName("page-content")[0];
        const entryC = entry.getElementsByClassName("page-content")[0];

        // measure size of entry and exit content
        const [oldWidth, oldHeight] = [exitC.offsetWidth, exitC.offsetHeight];
        const [newWidth, newHeight] = [entryC.offsetWidth, entryC.offsetHeight];

        // set explicit w/h of container, necessary for CSS transition
        container.style.setProperty("width", `${oldWidth}px`);
        container.style.setProperty("height", `${oldHeight}px`);
        container.style.setProperty("transition", `all ${props.duration}s`);

        // transitioning class hides all .tl-wrapper for performance
        tlEdges.style.setProperty("display", "none");

        // after the styles above have been applied, transition to new w/h
        requestAnimationFrame(() => {
          container.style.setProperty("width", `${newWidth}px`);
          container.style.setProperty("height", `${newHeight}px`);
        });

        // remove transitioning class after animation complete
        // and set let container size be dynamic again in case of resize
        setTimeout(() => {
          tlEdges.style.setProperty("display", "initial");
          container.style.setProperty("width", `auto`);
          container.style.setProperty("height", `auto`);
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
