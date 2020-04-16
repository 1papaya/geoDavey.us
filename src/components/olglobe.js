import React from "react";

import { Map, View } from "ol";

import { RegularShape, Stroke, Style } from "ol/style";
import { fromLonLat, toLonLat, transformExtent } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import Feature from "ol/Feature";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { linear } from "ol/easing";
import arc from "arc";

import OLGlobeCSS from "../styles/ol-globe.scss";

class OLGlobe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      olGlobe: null,
    };

    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // once component is mounted, render OL map inside mapRef container
    this.setState({
      olGlobe: new OLGlobeMap({
        target: this.mapRef.current,
        places: this.props.places,
        duration: this.props.duration,
        onLoad: this.props.onLoad,
        initBounds: [-180, -55, -180, 72],
      }),
    });
  }

  render() {
    return (
      <div
        className="ol-globe square"
        style={{
          width: "100%",
          height: "100%",
          maxWidth: this.props.maxWidth,
          maxHeight: this.props.maxWidth,
        }}
      >
        <div
          ref={this.mapRef}
          className="ol-globe-container"
          style={{
            borderRadius: "50%",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></div>
        <div
          className="ol-globe-ring"
          style={{
            backgroundImage: `url(/assets/img/globe-ring.png)`,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundSize: "100% 100%",
            zIndex: 1337,
          }}
        ></div>
      </div>
    );
  }
}

class OLGlobeMap extends Map {
  constructor(opt) {
    // opt:
    //   target: target map container element
    //   initBounds: initial bounds to fit to viewport before rotation, in wgs84
    //   places: array of objects with ["node"]["x"] and ["node"]["y"] properties
    //   duration: duration in msec of one globe rotation for rotation animation
    //   onLoad: callback for once map is initially loaded

    let initBounds = transformExtent(opt.initBounds, "EPSG:4326", "EPSG:3857");

    super({
      target: opt.target,
      controls: [],
      layers: [
        new TileLayer({
          title: "OSM Topo",
          name: "osm_topo",
          baseLayer: true,
          source: new XYZ({
            url: "/assets/opentopomap/{z}/{x}/{y}.png",
          }),
        })
      ],
      view: new FitView(opt.target, initBounds),
      loadTilesWhileAnimating: true,
    });

    this.once("rendercomplete", opt.onLoad);

    this.addPointsLayer(opt.places);
    this.addLinesLayer(opt.places);

    this.render();
    this.animate(opt.duration);
  }

  addPointsLayer(places) {
    // generate OL vector layer of travel points

    let ptsFeatures = [];
    let ptsStyle = (ft) => {
      return new Style({
        image: new RegularShape({
          stroke: new Stroke({
            color: ft.get("last") ? "red" : "black",
            width: 2,
          }),
          points: 4,
          radius: 5,
          radius2: 0,
          angle: Math.PI / 4,
        }),
      });
    }

    for (var i = 0; i < places.length; i++) {
      let plc = places[i]["node"];

      var ft = new Feature({
        name: plc["address"],
        last: !!(i == places.length - 1),
        geometry: new Point(
          fromLonLat([parseFloat(plc["x"]), parseFloat(plc["y"])], "EPSG:3857")
        ),
      });

      ptsFeatures.push(ft);
    }

    let ptsLayer = new VectorLayer({
      name: "points",
      style: ptsStyle,
      updateWhileAnimating: true,
      source: new VectorSource({
        features: ptsFeatures,
      }),
    });

    this.addLayer(ptsLayer);
  }

  addLinesLayer(places) {
    // generate OL vector layer of travel lines calculated with great arc circle

    let lnsFeatures = [];
    let lnsStyle = (ft) => {
      return new Style({
        stroke: new Stroke({
          width: 1,
          color: "black",
          lineDash: [1, 5],
        }),
      });
    };

    for (var i = 0; i < places.length - 1; i++) {
      let a = places[i]["node"];
      let b = places[i + 1]["node"];

      var arcGen = new arc.GreatCircle(
        { x: parseFloat(a["x"]), y: parseFloat(a["y"]) },
        { x: parseFloat(b["x"]), y: parseFloat(b["y"]) }
      );

      var arcLine = new LineString(
        arcGen.Arc(10, { offset: 10 }).geometries[0].coords
      );

      arcLine.transform("EPSG:4326", "EPSG:3857");

      let ft = new Feature({
        geometry: arcLine,
      });

      lnsFeatures.push(ft);
    }

    let lnsLayer = new VectorLayer({
      name: "lines",
      updateWhileAnimating: true,
      source: new VectorSource({
        features: lnsFeatures,
      }),
      style: lnsStyle,
    });

    this.addLayer(lnsLayer);
  }

  animate(msec) {
    // animate globe rotation west -> east with `msec` to make one full rotation

    let view = this.getView();
    let origin_y = toLonLat(view.getCenter(), view.getProjection())[1];

    let rotation = [];
    let stops = [-90, 0, 90, 180, -180];

    for (var stop of stops) {
      if (stop == -180) {
        rotation.push({
          center: fromLonLat([-180, origin_y]),
          duration: 0,
          easing: linear,
        });
        rotation.push(function (done) {
          if (done) view.animate.apply(view, rotation);
        });
      } else
        rotation.push({
          center: fromLonLat([stop, origin_y]),
          duration: parseInt(msec / 4),
          easing: linear,
        });
    }

    view.animate.apply(view, rotation);
  }
}

class FitView extends View {
  // fit an view to extent and target element

  constructor(target, bounds, padding = 10) {
    super({});

    this.fit(bounds, {
      size: [target.offsetHeight, target.offsetWidth],
      padding: [padding, padding, padding, padding],
      constrainResolution: false,
    });
  }
}

export default OLGlobe;
