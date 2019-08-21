import globe from './globe';

document.addEventListener("DOMContentLoaded", function(){
    window.gD_globe = new globe({
        target: "globe",
        layer: "osm_topo"
    });

});
