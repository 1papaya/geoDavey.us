import {Map, View, inherits} from 'ol';

import {fromLonLat, toLonLat, transformExtent} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import BingMaps from 'ol/source/BingMaps';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {linear} from 'ol/easing';
import arc from 'arc';

var Globe = function(opt) {

    console.log(opt.places);
    this.target = opt.target;
    this.proj = opt.proj || "EPSG:3857";
    this.init_bounds = opt.init_bounds || [-30, -55, 30, 72];
    this.init_bounds = transformExtent(this.init_bounds, "EPSG:4326", this.proj);

    //
    // Fit View
    //

    this.FitView = function(target, bounds, padding=10) {
        View.call(this, {});

        this.fit(bounds, {
            size: [target.offsetHeight, target.offsetWidth],
            padding: [padding, padding, padding, padding],
            constrainResolution: false
        });
    };

    inherits(this.FitView, View);

    //
    // Animation
    //

    this.animate = function(msec) {
        // msec = mseconds per rotation

        let view = this.getView();
        let origin_y = toLonLat(view.getCenter(), view.getProjection())[1];

        let rotation = [];
        let stops = [90, 180, -90, 0];

        for (var stop of stops)
        {
            rotation.push({
                center: fromLonLat([stop, origin_y]),
                duration: parseInt( msec/4 ),
                easing: linear
            });

            // gotta switch to -180 at map edge
            if (stop == 180)
                rotation.push({
                    center: fromLonLat([-180, origin_y]),
                    duration: 0,
                    easing: linear
                });
        }

        view.animate.apply(view, rotation);

        setInterval(function(){
            view.animate.apply(view, rotation);
        }, msec);

    };

    //
    // Generate Points Layer
    //

    let ptsFeatures = [];

    for (var i=0; i<opt.places.length; i++) {
        let plc = opt.places[i];

        var ft = new Feature({
            name: plc["address"],
            last: !!( i == opt.places.length - 1),
            geometry: new Point(
                fromLonLat([parseFloat(plc["x"]), parseFloat(plc["y"])], this.proj)
            )
        });

        ptsFeatures.push(ft);
    }

    var ptsLayer = new VectorLayer({
        name: "points",
        updateWhileAnimating: true,
        source: new VectorSource({
            features: ptsFeatures
        })
    });

    //
    // Generate Lines Layer
    //

    let lnsFeatures = [];

    for (var i=0; i<opt.places.length-1; i++) {
        let a = opt.places[i];
        let b = opt.places[i+1];


        var arcGen = new arc.GreatCircle(
            {x: parseFloat(a["x"]), y: parseFloat(a["y"])},
            {x: parseFloat(b["x"]), y: parseFloat(b["y"])}
        );

        var arcLine = new LineString(
            arcGen.Arc(10, {offset: 10}).geometries[0].coords
        );

        arcLine.transform('EPSG:4326', this.proj);

        let ft = new Feature({
            geometry: arcLine
        });

        lnsFeatures.push(ft);
    }

    var lnsLayer = new VectorLayer({
        name: "lines",
        updateWhileAnimating: true,
        source: new VectorSource({
            features: lnsFeatures
        })
    });

    //
    // Globe Load
    //

    Map.call(this, {
        target: this.target,
        controls: [],
        layers: [
            new TileLayer({
                title: "OSM Topo",
                name: 'osm_topo',
                baseLayer: true,
                source: new XYZ({
                    url: '//a.tile.opentopomap.org/{z}/{x}/{y}.png'
                })
            }),
            lnsLayer,
            ptsLayer
            //new TileLayer({
            //    title: "Bing Satellite",
            //   name: "bng_satellite",
            //    baseLayer: true,
            //    source: new BingMaps({
            //        key: "Ap_AF_-eOJAURQf6LAyArtmuF5-USl1bRKPrtqp0U9BpaqyVaU78_k7Pua6Q-e07",
            //        imagerySet: "Aerial"
            //    })
            //})
            //new TileLayer({
            //    title: "HOTOSM",
            //    name: 'hotosm',
            //    baseLayer: true,
            //    source: new XYZ({
            //        url: "//a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            //    })
            //})
            //new TileLayer({
            //    title: "OSM Road",
            //    name: 'osm_road',
            //    baseLayer: true,
            //    source: new XYZ({
            //        url: '//a.tile.openstreetmap.org/{z}/{x}/{y}.png'
            //    })
            //})
        ],
        view: new this.FitView(this.target, this.init_bounds),
        loadTilesWhileAnimating: true
    });

    this.render();
};

inherits(Globe, Map);

export default Globe;
