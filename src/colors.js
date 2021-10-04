import { layout, colors, legend_container, control, popup, numberFormatter } from "./init";
import { hexToColor, hexToRgba } from "@flourish/pocket-knife";
import data from "./data";

let color_array;

function updateColors() {
	var color_obj = {};
	color_array = [];

    var color_data = data.data;
    for (var i = 0; i < color_data.length; i++) {
        var color = color_data[i].color;
        if (color_obj[color] || !color) continue;
        color_obj[color] = true;
        color_array.push(color);
    }

    colors.updateColorScale(color_array);
}
export { updateColors, color_array};