import { geoOrthographic, geoGraticule, geoPath } from "d3-geo";
import { useStaticQuery, graphql } from "gatsby";
import React, { useRef, useEffect } from "react";
import { select } from "d3-selection";
import { feature } from "topojson-client";
import { timer } from "d3-timer";

import landTopo from "../../data/land-110m.json";
import silData from "../../data/silhouette.json";

// start animation on random place on the globe
// animate rotation for a few seconds
// start to shrink globe, while growing silhouette
// shrink to 80px / 60px for mobile
// stop animation
// use static svg as page prop, if no page prop then start animation
// and pass to all pagetransitionlink links

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
      .scale(width / 2 - props.ringWidth * 2)
      .translate([width / 2, width / 2]);

    let path = geoPath().projection(proj);

    // add rings
    let outerRing = svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", width / 2)
      .attr("r", width / 2)
      .style("fill", props.colors.outerRing)
      .style("opacity", "1");

    let innerRing = svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", width / 2)
      .attr("r", width / 2 - props.ringWidth)
      .style("fill", props.colors.innerRing)
      .style("opacity", "1");

    // add bg
    let bg = svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", width / 2)
      .attr("r", width / 2 - props.ringWidth * 2)
      .style("fill", props.colors.water)
      .style("opacity", "1");

    // add land topojson
    let landFt = feature(landTopo, landTopo.objects.land).features;
    let land = svg
      .selectAll(".land")
      .data(landFt)
      .enter()
      .append("path")
      .attr("class", "land rotate")
      .attr("d", path)
      .style("stroke", "transparent")
      .style("stroke-width", "1px")
      .style("fill", props.colors.land)
      .style("opacity", "1");

    // add graticule lines
    let graticule = svg
      .append("path")
      .datum(geoGraticule())
      .attr("class", "graticule rotate")
      .attr("d", path)
      .style("fill", "transparent")
      .style("stroke", props.colors.graticule)
      .style("opacity", "0");

    // silhouette clip path
    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "outerClip")
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", width / 2)
      .attr("r", width / 2);

    // silhouette
    let silW = silData.viewbox[0] * props.silhouetteScale;
    let silH = silData.viewbox[1] * props.silhouetteScale;

    let silTransform = `translate(${width / 2 - silW / 2} ${
      width - silH
    }) scale(${props.silhouetteScale})`;

    let silhouette = svg
      .append("g")
      .attr("clip-path", "url(#outerClip)")
      .append("path")
      .attr("d", silData.silhouette)
      .attr("transform", silTransform)
      .style("fill", props.colors.silhouette);

    // bandana
    let bandana = svg
      .append("path")
      .attr("d", silData.bandana)
      .attr("transform", silTransform)
      .style("fill", props.colors.bandana);

    // text
    let text = svg
      .append("text")
      .attr("transform", ` ${silTransform} matrix(${silData.text.matrix})`)
      .style("font-family", "BadScript")
      .style("font-size", `${silData.text.size}px`)
      .style("fill", props.colors.text)
      .html("geoDavey");

    // globe rotation
    const rotation = timer((elapsed) => {
      proj.rotate([-props.speed * elapsed, props.vTilt, props.hTilt]);
      svg.select(".rotate").attr("d", path);
    });

    return () => clearInterval(rotation);
  }, []);

  return (
    <svg ref={svgRef} className={props.className} style={{ width: props.width, height: props.width }}>
      <g ref={waypointsRef}></g>
    </svg>
  );
};

D3Globe.defaultProps = {
  style: {},
  className: "",
  speed: 0.01,
  vTilt: -10,
  hTilt: 0,
  ringWidth: 10,
  silhouetteScale: 0.25,
  colors: {
    outerRing: "#ef3147",
    innerRing: "#ff7a37",
    land: "#c0dc74",
    water: "#8ebfe5",
    graticule: "#ccc",
    text: "transparent",
    silhouette: "#4b4b4b",
    bandana: "#ce78c5",
  },
};

export default D3Globe;
