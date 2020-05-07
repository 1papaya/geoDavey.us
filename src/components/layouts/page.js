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

    const pausLength = 4.3; // 4.3
    const animLength = 1.5;

    // set logo initial
    logo.style.setProperty("width", "310px");
    logo.style.setProperty("height", "310px");

    // set up initial transition, shrink the content
    parent.style.setProperty("width", "0px");
    parent.style.setProperty("height", "0px");
    parent.style.setProperty("overflow", "hidden");
    parent.style.setProperty("transition", `all ${animLength}s`);

    // commit style changes
    requestAnimationFrame(() => {
      // (1) pause...
      setTimeout(() => {
        // (2) trigger logo and content transition
        logo.style.setProperty("transition", `all ${animLength}s`);
        parent.style.setProperty("width", `${pWidth}px`);
        parent.style.setProperty("height", `${pHeight}px`);

        // (3) commit style changes, release logo w/h changes
        requestAnimationFrame(() => {
          logo.style.removeProperty("height");
          logo.style.removeProperty("width");
        });

        // (4) on animation finish release content style changes
        setTimeout(() => {
          parent.style.setProperty("width", "auto");
          parent.style.setProperty("height", "auto");
          parent.style.setProperty("overflow", "visible");

          setIsPreloaded(true);
        }, animLength * 1000);
      }, pausLength * 1000);
    });
  }, []);

  return (
    <div
      className={`flex mx-auto w-full bg-standard justify-center items-center min-h-screen min-h-screen-fix ${
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
      <div className="content flex flex-col md:items-center w-full md:w-auto md:flex-row h-full md:rounded-lg">
        <div className="nav bg-standard flex self-stretch text-center items-stretch md:sticky md:bg-standard md:text-right text-xs md:text-sm md:m-0 sticky md:static z-10 top-0 max-h-screen select-none font-palanquin justify-center md:top-4 md:flex-col sticky">
          <PageTransitionLink
            className="flex overflow-hidden text-black fade-in justify-center md:justify-end items-center outline-none whitespace-no-wrap p-1 md:pt-2 w-2/12 md:w-auto"
            to="/"
            activeClassName="font-bold"
          >
            <span>home</span>
          </PageTransitionLink>

          <PageTransitionLink
            className="flex overflow-hidden text-black fade-in justify-center md:justify-end items-center outline-none whitespace-no-wrap p-1 w-2/12 md:w-auto"
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
            className="flex overflow-hidden text-black fade-in justify-center md:justify-end items-center md:justify-right outline-none whitespace-no-wrap p-1 w-2/12 md:w-auto"
            to="/maps/"
            activeClassName="font-bold"
          >
            <span>maps</span>
          </PageTransitionLink>
          <PageTransitionLink
            className="flex overflow-hidden text-black fade-in justify-center md:justify-end items-center outline-none whitespace-no-wrap p-1 w-2/12 md:w-auto"
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
            className="page-container md:ml-4 md:mt-4 md:mb-4 sm:w-full-minus-important relative md:rounded-lg box-content"
            style={{
              background: "rgba(0,0,0,0.075)",
            }}
          >
            {props.children}

            <div
              className="fine-print hidden absolute right-0 text-right text-gray-500 text-sm"
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
      className={`page-content sm:w-full-important md:w-auto ${props.className}`}
      style={{ width: props.width }}
    >
      {props.children}
    </div>
  );
};

PageContent.defaultProps = {
  width: 420,
  className: "p-2",
};

const PageTransitionLink = (props) => {
  let [prevPath, setPrevPath] = useState(null);
  let [isTransitioning, setIsTransitioning] = useState(false);

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
      onClick={() => {
        // no transition spinner if link goes to current page
        if (props.to !== document.location.pathname) setIsTransitioning(true);
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

        // commit style changes. transition to new w/h
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

          setIsTransitioning(false);
        }, props.duration * 1000);
      }}
      {...props}
    >
      {props.children}
      {isTransitioning && (
        <Loader
          type="TailSpin"
          color="#ccc"
          height={80}
          width={80}
          className="fixed bg-white bg-opacity-50 top-0 left-0 h-full w-full flex justify-center items-center"
        />
      )}
    </TransitionLink>
  );
};

PageTransitionLink.defaultProps = {
  duration: 2,
};

export default PageLayout;
export { PageTransitionLink };
export { PageContent };
