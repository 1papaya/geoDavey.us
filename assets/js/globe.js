import {Map, View, inherits} from 'ol';

import {defaults as defaultsControl} from 'ol/control';
import BingMaps from 'ol/source/BingMaps';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

var globe = function(opt) {

    // opt: target
    // opt: start_lon

    function SwaziView(target, padding=10) {

        const bounds = [3427637.922163467, -3163184.323967456,
                        3577228.0000320906, -2964196.586792509];

        View.call(this, {
            extent: bounds
        });

        this.fit(bounds, {
            size: [target.offsetHeight, target.offsetWidth],
            padding: [padding, padding, padding, padding],
            constrainResolution: false
        });

        this.setMinZoom(this.getZoom() - 1);
    }

    inherits(SwaziView, View);

    var lyrs = {
        osm_road: new TileLayer({
            title: "OSM Road",
            name: 'osm_road',
            baseLayer: true,
            source: new XYZ({
                url: '//{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        }),
        osm_topo: new TileLayer({
            title: "OSM Topo",
            name: 'osm_topo',
            baseLayer: true,
            source: new XYZ({
                url: '//{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
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
        target: opt.target,
        controls: [],
        layers: [ lyrs[opt.layer] ],
        view: new View({
            center: [0,0],
            zoom: 2
        }),
    });

};

inherits(globe, Map);

module.exports = globe;
