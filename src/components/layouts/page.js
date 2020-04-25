import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { css, Global } from "@emotion/core";
import { Link } from "gatsby";

import Nav from "../nav";

const PageLayout = (props) => {
  const contentRef = useRef(null);
  const [contentStyle, setContentStyle] = useState(null);

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
    <div className="w-full md:min-h-screen flex justify-center sm:items-start md:items-center"
    style={{
      background: "#f5f3f0"
    }}>
      <div className="flex h-full rounded-lg m-8">
        <Nav />

        <div className="relative flex h-full flex-col">
          <div
            className="content p-2 rounded-lg"
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
