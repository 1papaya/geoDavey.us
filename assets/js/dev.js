import Globe from './globe';

document.addEventListener("DOMContentLoaded", function(){
    window.gD_globe = new Globe({
        target: document.getElementById("globe"),
        layer: "osm_topo"
    });

    window.gD_globe.animate(24000);

});
