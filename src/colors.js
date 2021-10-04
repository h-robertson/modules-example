import { layout, colors, legend_container, legend_categorical, control, popup, numberFormatter } from "./init";
import { hexToColor, hexToRgba } from "@flourish/pocket-knife";
import data from "./data";
import { state } from "./state.js"

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

    // Add categorical legend
    const legend_items = new Set();

    data.data.forEach(function (d) {
        legend_items.add(d.label)
    });

   let legend_array = Array.from(legend_items)

    legend_categorical
        .data(legend_array, colors.getColor)
        .update()
}

export { updateColors, color_array};