import React, { useRef, useEffect, useState } from "react";
import { css } from "@emotion/core";

import TransitionLink from "gatsby-plugin-transition-link";
import GraticuleBg from "../components/svg/graticuleBg";
import D3Globe from "./svg/d3globe";
import Loader from "./loader";
import { parsePath } from "gatsby-link";

import { connect } from "react-redux";

const mapStateToProps = ({ isTransitioning }) => {
  return { isTransitioning };
};

const PageLayout = connect(mapStateToProps)((props) => {
  const contentRef = useRef(null);
  const logoRef = useRef(null);
  const contentParentRef = useRef(null);

  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isMobile, setIsMobile] = useState(null);
  let isMap = "pageContext" in props && "isMap" in props.pageContext;

  const globeWidth = 340;
  const fadeInLength = 2;
  const pausLength = 6.4;
  const animLength = 2;

  // splash animation for regular page
  useEffect(() => {
    const isMobile = document.documentElement.clientWidth <= 768;
    const parent = contentParentRef.current;
    const logo = logoRef.current;
    let [pWidth, pHeight] = [parent.clientWidth, parent.clientHeight];

    // set up initial transition, shrink the content
    parent.style.setProperty("width", "0px");
    parent.style.setProperty("height", "0px");
    parent.style.setProperty("overflow", "hidden");
    parent.style.setProperty("transition", `all ${animLength}s`);

    setIsMobile(isMobile);

    // commit style changes
    requestAnimationFrame(() => {
      logo.style.setProperty("transition", `opacity 5s ease-in-out`);
      logo.style.setProperty("width", `${globeWidth}px`);
      logo.style.setProperty("height", `${globeWidth}px`);
      logo.style.setProperty("opacity", "1");

      requestAnimationFrame(() => {
        // (1) pause...
        setTimeout(() => {
          // (2) trigger logo and content transition
          logo.style.setProperty("transition", `all ${animLength}s`);

          // if page is a map, fade out logo
          if (isMap) {
            requestAnimationFrame(() => {
              // fire TRANSITION_START, map will fire TRANSITION_END once loaded
              props.dispatch({ type: "TRANSITION_START" });
              logo.style.setProperty("opacity", "0");

              setTimeout(() => {
                setIsPreloaded(true);
              }, animLength * 1000);
            });
          }

          // if page is regular, animate icon
          if (!isMap) {
            parent.style.setProperty("width", `${pWidth}px`);
            parent.style.setProperty(
              "height",
              isMobile ? "calc(100vh - 56px)" : `${pHeight}px`
            );

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
          }
        }, pausLength * 1000);
      });
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
          transition: opacity ${fadeInLength}s ease-in-out;
        }
        &.preloading {
          overflow: hidden;
          .fade-in {
            opacity: 0;
          }
        }
      `}
    >
      <Loader />

      <div className="content z-10 flex flex-col md:items-center w-full md:w-auto md:flex-row h-full md:rounded-lg">
        {(!isMap || !isPreloaded) && (
          <div
            className={`nav bg-standard flex self-stretch text-center items-stretch md:bg-standard md:text-right text-xs md:m-0 sticky z-30 top-0 max-h-screen select-none font-palanquin justify-center md:top-4 md:flex-col md:overflow-visible ${
              isPreloaded ? "overflow-hidden" : ""
            }`}
          >
            <PageTransitionLink
              className="flex overflow-hidden text-black fade-in justify-center md:justify-end items-center outline-none whitespace-no-wrap p-1 w-2/12 md:w-auto"
              to="/"
              activeClassName="font-bold"
            >
              <span className="md:bg-white md:px-3 md:py-1 md:rounded md:bg-opacity-75 md:shadow-outline2">
                home
              </span>
            </PageTransitionLink>

            <PageTransitionLink
              className="flex overflow-hidden text-black fade-in justify-center md:justify-end items-center outline-none whitespace-no-wrap p-1 w-2/12 md:w-auto"
              to="/now/"
              activeClassName="font-bold"
            >
              <span className="md:bg-white md:px-3 md:py-1 md:rounded md:bg-opacity-75 md:shadow-outline2">
                /now/
              </span>
            </PageTransitionLink>
            <div className="flex flex-shrink my-1 mx-2 py-1 justify-center md:w-auto md:justify-end">
              <div
                ref={logoRef}
                className="logo md:m-0 relative h-10 w-10 md:w-28 md:h-28"
                style={
                  isPreloaded
                    ? {}
                    : {
                        opacity: 0,
                        width: globeWidth,
                        height: globeWidth,
                        maxWidth: "95vw",
                        maxHeight: "95vw",
                      }
                }
              >
                <GraticuleBg
                  className="absolute"
                  style={{
                    zIndex: -10,
                    top: "50%",
                    left: "50%",
                    width: "200vw",
                    transform: "translate(-50%, -50%)",
                    maxHeight: !isPreloaded && isMobile ? "200vh" : "100vh",
                  }}
                  scale={1.2}
                  center={[90, 0]}
                  rotate={[0, 0, 90]}
                />
                <D3Globe
                  className="absolute w-full h-full"
                  silhouetteScale={0.47}
                />
              </div>
            </div>
            <PageTransitionLink
              className="flex overflow-hidden text-black fade-in justify-center md:justify-end items-center md:justify-right outline-none whitespace-no-wrap p-1 w-2/12 md:w-auto"
              to="/projects/"
              activeClassName="font-bold"
            >
              <span className="md:bg-white md:px-3 md:py-1 md:rounded md:bg-opacity-75 md:shadow-outline2">
                projects
              </span>
            </PageTransitionLink>
            <PageTransitionLink
              className="flex overflow-hidden text-black fade-in justify-center md:justify-end items-center outline-none whitespace-no-wrap p-1 w-2/12 md:w-auto"
              to="/1love/"
              activeClassName="font-bold"
            >
              <span className="md:bg-white md:px-3 md:py-1 md:rounded md:bg-opacity-75 md:shadow-outline2">
                1love
              </span>
            </PageTransitionLink>
          </div>
        )}

        <div
          ref={contentParentRef}
          className="z-20 flex fade-in flex-col md:justify-center"
        >
          <div
            ref={contentRef}
            className="page-container md:ml-4 md:mt-4 md:mb-4 sm:w-full-minus-important sm:h-screen-minus-nav relative md:rounded-lg box-content"
            style={{
              background: "rgba(0,0,0,0.075)",
            }}
          >
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
});

const PageContent = (props) => {
  return (
    <div
      className={`page-content sm:w-full-important md:w-auto md:shadow md:rounded ${props.className}`}
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

const MapContent = (props) => {
  return (
    <div
      className={`page-content geodavey-map fixed top-0 left-0 w-full h-full`}
      style={{ width: props.width }}
    >
      {props.children}
    </div>
  );
};

const PageTransitionLink = connect()((props) => {
  let [prevPath, setPrevPath] = useState(null);
  let linkRef = useRef();

  // set the prev path on render, for back buttons
  useEffect(() => {
    setPrevPath(document.location.pathname);

    // force gatsby to prefetch all transitionlink page data onload
    window.___loader.hovering(parsePath(props.to).pathname);
  }, []);

  let { dispatch, ...passedProps } = props;

  return (
    <TransitionLink
      state={{ prevPath }}
      entry={{
        length: props.duration,
        appearAfter: props.duration,
      }}
      innerRef={linkRef}
      exit={{
        length: props.duration,
      }}
      trigger={async (pages) => {
        let isMobile = document.documentElement.clientWidth < 768;

        // no transition spinner if link goes to current page
        if (props.to !== document.location.pathname)
          props.dispatch({ type: "TRANSITION_START" });

        // wait for both entry and exit pages to load
        const { node: exit } = await pages.exit;
        const { node: entry } = await pages.entry;

        // barbaric, i know
        let isMap = entry.querySelectorAll(".geodavey-map").length > 0;

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

        // hide the content during animation, for performance
        tlEdges.style.setProperty("display", "none");

        if (!isMap) {
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

            props.dispatch({ type: "TRANSITION_END" });
          }, props.duration * 1000);
        }

        if (isMap) {
          container.style.setProperty("margin", "0", "important");

          requestAnimationFrame(() => {
            container.style.setProperty("width", `100vw`);
            container.style.setProperty("height", `100vh`);
          });

          setTimeout(() => {
            container.style.removeProperty("margin");
            tlEdges.style.setProperty("display", "initial");
            container.style.setProperty("width", `auto`);
            container.style.setProperty("height", `auto`);

            // fire resize to make sure map element resizes too
            window.dispatchEvent(new Event("resize"));
          }, props.duration * 1000);
        }
      }}
      {...passedProps}
    >
      {props.children}
    </TransitionLink>
  );
});

PageTransitionLink.defaultProps = {
  duration: 2,
};

export default PageLayout;
export { PageTransitionLink };
export { PageContent, MapContent };
