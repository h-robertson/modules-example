// An init file is often used to intialise Flourish modules (importing & running their initialization functions)
import initLayout from "@flourish/layout";
import createColors from "@flourish/colors";
import initControls from "@flourish/controls";
import { createLegendContainer, createDiscreteColorLegend, createContinuousColorLegend, createContinuousSizeLegend } from "@flourish/legend";
import initialisePopup from "@flourish/info-popup";
import initFormatter from "@flourish/number-formatter";

import { state } from "./state";

// Layout
const layout = initLayout(state.layout);

// Colors
const colors = createColors(state.colors);

// Controls
const control = initControls(state.controls);

// Legends
const legend_container = createLegendContainer(state.legend_container);

const legend_categorical = createDiscreteColorLegend(state.legend_categorical);
const legend_continuous = createContinuousColorLegend(state.legend_continuous);
const legend_size = createContinuousSizeLegend(state.legend_size);

legend_container
	.appendTo(layout.getSection("legend"))
	.add([
		legend_categorical,
		legend_continuous,
		legend_size
	]);

// Popups
const popup = initialisePopup(state.popup);


// Number formatter
const numberFormatter = initFormatter(state.number_format);


export { layout, colors, legend_container, legend_categorical, legend_continuous, control, popup, numberFormatter };
