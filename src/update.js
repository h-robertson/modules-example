// import { layout } from "./draw";
import { layout, colors, legend_container, control, popup, numberFormatter } from "./init";
import { select, selectAll } from "d3-selection";
import data from "./data";
import { updateColors, color_array } from "./colors";

function update() {
    layout.update();

    updateColors();

    // Select svg & get width & height
    const svg = select("#chart-container")
    let w = svg.node().getBoundingClientRect().width;
    let h = svg.node().getBoundingClientRect().height;

    // Append circles based on data
    svg.selectAll("circle")
       .data(data.data)
       .enter()
       .append("circle")

    // Style circles based on data (size by value, color by color column using selected palette & position by index)
    svg.selectAll("circle")
       .attr('r', (d) => d.value*2)
       .attr("fill", (d) => colors.getColor(d.color))
       .attr("cx", (d,i) => i*w/data.data.length+40)
       .attr("cy", 100)

   // Popups
   popup
      .setColumnNames(data.data.column_names)
      .update()

   selectAll("circle") // datapoints
      .on("mouseover", function(event, data) {
         const el = this;
         console.log(data);
         popup.mouseover(el, data);
      })
      .on("mouseout", function() {
         popup.mouseout();
      })
};


export default update;