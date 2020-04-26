import React, { useRef, useEffect, useState } from "react";
import { css, Global } from "@emotion/core";
import { Link, useStaticQuery, graphql } from "gatsby";

import TransitionLink from "../transitionlink";

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

  const [contentStyle, setContentStyle] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // isLoading state
  useEffect(() => {
    if (!("mount" in props)) setIsLoaded(true); // if page is loaded not via transition
    else setIsLoaded(props.transitionStatus === "entered" && props.mount)
  }, [props.transitionStatus]);

  // set page content to have "transition" class with its actual height/width, for transition
  useEffect(() => {
    setContentStyle(
      <Global
        styles={css`
          .transition {
            width: ${contentRef.current.offsetWidth}px !important;
            height: ${contentRef.current.offsetHeight}px !important;
          }
        `}
      />
    );
    contentRef.current.classList.add("transition");
  }, []);


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
            <TransitionLink
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
                className="block outline-none whitespace-no-wrap p-1"
                to="/blog"
                activeClassName="font-bold"
              >
                blog
              </TransitionLink>
              <TransitionLink
                className="block outline-none whitespace-no-wrap p-1"
                to="/maps"
                activeClassName="font-bold"
              >
                maps
              </TransitionLink>
              <TransitionLink
                className="block outline-none whitespace-no-wrap p-1"
                to="/contact"
                activeClassName="font-bold"
              >
                contact
              </TransitionLink>
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
            {contentStyle}
            {props.children}
          </div>

          <div
            className="fine-print absolute right-0 text-right text-gray-500 text-sm"
            style={{ top: "100%" }}
          >
            ¡{" "}
            <TransitionLink
              css={css`
                &:hover {
                  text-decoration: underline;
                }
              `}
              to="/gratitude"
            >
              viva la open source
            </TransitionLink>{" "}
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

export default PageLayout;
