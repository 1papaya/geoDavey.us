import {Map, View, inherits} from 'ol';

import {fromLonLat, transformExtent} from 'ol/proj';
import BingMaps from 'ol/source/BingMaps';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

var Globe = function(opt) {

    // TODO save options from opt to globe object

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
    // Globe Load
    //

    var lyrs = {
        osm_road: new TileLayer({
            title: "OSM Road",
            name: 'osm_road',
            baseLayer: true,
            source: new XYZ({
                url: '//a.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        }),
        osm_topo: new TileLayer({
            title: "OSM Topo",
            name: 'osm_topo',
            baseLayer: true,
            source: new XYZ({
                url: '//a.tile.opentopomap.org/{z}/{x}/{y}.png'
            })
        }),
        bng_satellite: new TileLayer({
            title: "Bing Satellite",
            name: "bng_satellite",
            baseLayer: true,
            source: new BingMaps({
                key: "Ap_AF_-eOJAURQf6LAyArtmuF5-USl1bRKPrtqp0U9BpaqyVaU78_k7Pua6Q-e07",
                imagerySet: "Aerial"
            })
        })
    };

    Map.call(this, {
        target: this.target,
        controls: [],
        layers: [ lyrs[opt.layer] ],
        view: new this.FitView(this.target, this.init_bounds),
        loadTilesWhileAnimating: true
    });

};

//
// Animation
//

Globe.prototype.spin = function() {

    let center = this.getView().getCenter();
    console.log(center);

    //view.animate({
    //    center: istanbul,
    //    duration: 2000,
    //    easing: bounce
    //});
}

inherits(Globe, Map);

module.exports = Globe;
