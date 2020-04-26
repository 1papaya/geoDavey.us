import React from "react";
import TransitionLinkOrig from "gatsby-plugin-transition-link";
import { css, Global } from "@emotion/core";
import ReactDOM from "react-dom";

const TransitionLink = (props) => {
  const entryAnim = {
    length: props.duration,
    appearAfter: props.duration,
  };

  const exitAnim = { length: props.duration };

  const transitionTrigger = async (pages) => {
    const exit = await pages.exit;
    const entry = await pages.entry;

    const entryContent = entry.node.getElementsByClassName("page-content")[0];
    const exitContent = exit.node.getElementsByClassName("page-content")[0];

    exitContent.innerHTML = ""; // clear content from old page

    // overwrite "transition" class with width/height of new content
    // once it has been added, add to transition class to element
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
  };

  return (
    <TransitionLinkOrig
      entry={entryAnim}
      exit={exitAnim}
      trigger={transitionTrigger}
      {...props}
    />
  );
};

TransitionLink.defaultProps = {
  duration: 2,
}

export default TransitionLink;