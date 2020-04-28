import { geoOrthographic, geoGraticule, geoPath } from "d3-geo";
import React, { useRef, useEffect, useState } from "react";
import { select, selectAll } from "d3-selection";
import { feature } from "topojson-client";
import { timer } from "d3-timer";

import landTopo from "../../data/land-110m.json";

const D3Globe = (props) => {
  const waypointsRef = useRef();
  const svgRef = useRef();
  const width = 500;

  // initial
  useEffect(() => {
    let svg = select(svgRef.current)
      .attr("width", width)
      .attr("height", width)
      .attr("viewBox", `0 0 ${width} ${width}`);

    let proj = geoOrthographic()
      .scale(width / 2)
      .translate([width / 2, width / 2]);

    let path = geoPath().projection(proj);

    // add bg
    let bg = svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", width / 2)
      .attr("r", width / 2)
      .style("fill", "#8ebfe5")
      .style("opacity", ".7");

    // add graticule lines
    let graticule = svg
      .append("path")
      .datum(geoGraticule())
      .attr("class", "graticule")
      .attr("d", path)
      .style("fill", "transparent")
      .style("stroke", "#ccc");

    // add land topojson
    let landFt = feature(landTopo, landTopo.objects.land).features;
    let land = svg
      .selectAll(".segment")
      .data(landFt)
      .enter()
      .append("path")
      .attr("class", "segment")
      .attr("d", path)
      .style("stroke", "#888")
      .style("stroke-width", "1px")
      .style("fill", (d, i) => "#c0dc74")
      .style("opacity", ".7");

    const rotation = timer((elapsed) => {
      proj.rotate([-props.speed * elapsed, props.vTilt, props.hTilt]);
      svg.selectAll("path").attr("d", path);
    });

    return () => clearInterval(rotation);
  }, []);

  return (
    <svg ref={svgRef} style={{ width: props.width, height: props.width }}>
      <g ref={waypointsRef}></g>
    </svg>
  );
};

D3Globe.defaultProps = {
  speed: 0.005,
  vTilt: -24,
  hTilt: 0,
};

export default D3Globe;
