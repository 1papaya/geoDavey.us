import {Fill, RegularShape, Stroke, Style} from 'ol/style';

var styles = {
    points: function(ft) {
        return new Style({
            image: new RegularShape({
                stroke: new Stroke({
                    color: ft.get('last') ? "red":"black",
                    width: 2
                }),
                points: 4,
                radius: 5,
                radius2: 0,
                angle: Math.PI/4
            })
        });
    },
    lines: function(ft) {
        return new Style({
            stroke: new Stroke({
                width: 1,
                color: "black",
                lineDash: [1, 5]
            })
        });
    }
};

export default styles;
