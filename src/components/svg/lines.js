import React from "react";

function LinesSVG(props) {
  return (
    <svg
      style={{
        width: "100%",
        height:
          props.colors.length * (props.strokeSpacing + props.strokeWidth),
      }}
    >
      {props.colors.map((c, c_idx) => {
        const y =
          props.strokeSpacing +
          c_idx * (props.strokeSpacing + props.strokeWidth);

        return (
          <line
            x1={0}
            x2={"100%"}
            y1={y}
            y2={y}
            stroke={c}
            stroke-width={props.strokeWidth}
            opacity={props.opacity}
          ></line>
        );
      })}
    </svg>
  );
}

LinesSVG.defaultProps = {
  opacity: "0.5",
  strokeWidth: 2,
  strokeSpacing: 4,
};

export default LinesSVG;
