import {Map, View, inherits} from 'ol';

import {fromLonLat, toLonLat, transformExtent} from 'ol/proj';
import BingMaps from 'ol/source/BingMaps';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {linear} from 'ol/easing';

var Globe = function(opt) {

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
    // Globe Load
    //

    Map.call(this, {
        target: this.target,
        controls: [],
        layers: [
            new TileLayer({
                title: "OSM Road",
                name: 'osm_road',
                baseLayer: true,
                source: new XYZ({
                    url: '//a.tile.openstreetmap.org/{z}/{x}/{y}.png'
                })
            })
        ],
        view: new this.FitView(this.target, this.init_bounds),
        loadTilesWhileAnimating: true
    });
};

inherits(Globe, Map);

export default Globe;
