import update from "./update";
import { layout, control } from "./init";
import { select } from "d3-selection";
import { state } from "./state";
function draw() {

    // Draw svg
    const svg = select(layout.getSection("primary"))
                  .append("svg")
                  .attr("id", "chart-container")
                  .attr("width", "100%")
                  .attr("height", "100%");

    update();
};

export default draw;