// draw() runs once when the template is first loaded.

import update from "./update";
import { layout } from "./init";
import { select } from "d3-selection";
function draw() {

    // Draw svg
    const svg = select(layout.getSection("primary"))
                  .append("svg")
                  .attr("id", "chart-container")
                  .attr("width", "100%")
                  .attr("height", "100%");

    // It can be a good idea to run update() at the end of draw
    update();
};

export default draw;