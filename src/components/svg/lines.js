import React from "react";

function LinesSVG(props) {
  return (
    <svg
      style={{
        width: "100%",
        height:
          props.padding*2 + (props.colors.length-1) * (props.strokeSpacing + props.strokeWidth),
      }}
    >
      {props.colors.map((c, c_idx) => {
        const y =
          props.padding +
          c_idx * (props.strokeSpacing + props.strokeWidth);

        return (
          <line
            key={c}
            x1={0}
            x2={"100%"}
            y1={y}
            y2={y}
            stroke={c}
            strokeWidth={props.strokeWidth}
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
  padding: 4
};

export default LinesSVG;
