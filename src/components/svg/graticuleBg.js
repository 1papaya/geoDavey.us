import { geoPath, geoTransverseMercator, geoGraticule } from "d3-geo";
import { interval } from "d3-timer";
import React, { useRef, useEffect } from "react";
import { select } from "d3-selection";

const StereographicBg = (props) => {
  const width = props.width;
  const svgRef = useRef();

  // initial
  useEffect(() => {
    let svg = select(svgRef.current)
      .attr("width", width)
      .attr("height", width)
      .attr("viewBox", `0 0 ${width} ${width}`);

    let proj = geoTransverseMercator()
      .scale(width / 2)
      .translate([width / 2, width / 2])
      .center([0, 90])
      .rotate([0, 0, 0]);

    let path = geoPath().projection(proj);
    let graticule = geoGraticule().step([10, 15]);

    svg
      .append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", "rgba(0,0,0,0.2)");
  }, []);

  return (
    <svg
      ref={svgRef}
      style={props.style}
      className={props.className}
    ></svg>
  );
};

StereographicBg.defaultProps = {
  className: "",
  center: [90, 0],
  rotate: [0, 0, 90],
  scale: 2,
  style: {},
  width: 1024,
  color: "#000",
};

export default StereographicBg;
