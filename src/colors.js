// You can include as many JS files as you want to organize your code. Here we have one being used to set up colors & legends.
import {layout, colors, legend_container, legend_categorical, legend_continuous, legend_size, control, popup, numberFormatter} from "./init";
import data from "./data";
import {state} from "./state.js"
import { scaleSqrt } from "d3-scale";
import { max } from "d3-array";

let color_array;

function getSizeValue(value) {
	var base_value= 1;
	return data.data.column_names.value ? value : base_value;
}


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

    // Apply numeric or categorical coloring & legend depending on data type bound to Color

    // For numeric...
    if (!isNaN(color_array[0])) {
        state.colors.scale_type = "numeric";

        color_array = color_array.map((x) => parseInt(x));

        let [min, max] = [Math.min(...color_array), Math.max(...color_array)]

        colors.updateColorScale(color_array);

        legend_continuous
            .visible(true)
            .data([min, max], colors.getColor)
            .update();

        // For categorical...
    } else {
        colors.updateColorScale(color_array);
        addCategoricalLegend();
        addSizeLegend();
    }
}

function addCategoricalLegend() {
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

function addSizeLegend() {
    legend_size
        .visible(true)
        .update();

    let max_radius = max(data.data, d=> parseFloat(getSizeValue(d.value)))

	const scale = scaleSqrt()
		.domain([0, max_radius])
		.range([0, max_radius]);

    legend_size
        .scale(scale)
        .update();
}

export {updateColors, color_array};