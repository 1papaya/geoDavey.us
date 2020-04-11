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

class Globe extends Map {
  constructor(opt) {
    const target = opt.target;
    const proj = opt.proj || "EPSG:3857";

    // Transform initial bounds to web mercator
    let init_bounds = opt.init_bounds || [-180, -55, -180, 72];
    init_bounds = transformExtent(init_bounds, "EPSG:4326", proj);

    //
    // Fit View
    //

    class FitView extends View {
      constructor(target, bounds, padding = 10) {
        super({});

        this.fit(bounds, {
          size: [target.offsetHeight, target.offsetWidth],
          padding: [padding, padding, padding, padding],
          constrainResolution: false,
        });
      }
    }

    //
    // Generate Points Layer
    //

    let ptsFeatures = [];

    for (var i = 0; i < opt.places.length; i++) {
      let plc = opt.places[i]["node"];

      var ft = new Feature({
        name: plc["address"],
        last: !!(i == opt.places.length - 1),
        geometry: new Point(
          fromLonLat([parseFloat(plc["x"]), parseFloat(plc["y"])], proj)
        ),
      });

      ptsFeatures.push(ft);
    }

    var ptsLayer = new VectorLayer({
      name: "points",
      style: stys.points,
      updateWhileAnimating: true,
      source: new VectorSource({
        features: ptsFeatures,
      }),
    });

    //
    // Generate Lines Layer
    //

    let lnsFeatures = [];

    for (var i = 0; i < opt.places.length - 1; i++) {
      let a = opt.places[i]["node"];
      let b = opt.places[i + 1]["node"];

      var arcGen = new arc.GreatCircle(
        { x: parseFloat(a["x"]), y: parseFloat(a["y"]) },
        { x: parseFloat(b["x"]), y: parseFloat(b["y"]) }
      );

      var arcLine = new LineString(
        arcGen.Arc(10, { offset: 10 }).geometries[0].coords
      );

      arcLine.transform("EPSG:4326", proj);

      let ft = new Feature({
        geometry: arcLine,
      });

      lnsFeatures.push(ft);
    }

    var lnsLayer = new VectorLayer({
      name: "lines",
      updateWhileAnimating: true,
      source: new VectorSource({
        features: lnsFeatures,
      }),
      style: stys.lines,
    });

    //
    // Globe Load
    //

    super({
      target: target,
      controls: [],
      layers: [
        new TileLayer({
          title: "OSM Topo",
          name: "osm_topo",
          baseLayer: true,
          source: new XYZ({
            url: "/assets/opentopomap/{z}/{x}/{y}.png",
          }),
        }),
        lnsLayer,
        ptsLayer,
      ],
      view: new FitView(target, init_bounds),
      loadTilesWhileAnimating: true,
    });

    this.render();
  }

  animate(msec) {
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

const stys = {
  points: function (ft) {
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
  },
  lines: function (ft) {
    return new Style({
      stroke: new Stroke({
        width: 1,
        color: "black",
        lineDash: [1, 5],
      }),
    });
  },
};

export default Globe;
