import React, { useState } from "react";
import Loader from "react-loader-spinner";

import { connect } from "react-redux";

const mapStateToProps = ({ isLoadingSuppressed, isTransitioning }) => {
  return { isLoadingSuppressed, isTransitioning };
};

export default connect(mapStateToProps)((props) => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: "50",
        background: "rgba(255, 255, 255, 0.5)",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        display: props.isTransitioning ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={(e) => {
        props.dispatch({ type: "LOADING_SUPPRESSED"});
        if ("onSuppressed" in props) props.onSuppressed(e);
      }}
    >
      <Loader type="TailSpin" color="#ccc" height={80} width={80} />
    </div>
  );
});
