// import { layout } from "./draw";
import { layout, colors, legend_container, popup, control, numberFormatter } from "./init";
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
         //  if ("filter" in data.data.column_names) {
         //     return processed_data;
         //  } else {
         //     return data.data;
         //  }
         // })
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
         popup.mouseover(el, data);
      })
      .on("mouseout", function() {
         popup.mouseout();
      })

   // Filter control
   const categories = new Set();

   data.data.forEach(function (d) {
     categories.add(d.filter)
   });

   let options = Array.from(categories)

   const control_container = select(layout.getSection("controls"))
      .append("span").attr("id", "filter-control").node();
   control.appendTo(control_container).on("change", function(){
      control.options(options)
      .update()
   })

   select(".fl-control-dropdown")
      .select(".list")
         .selectAll('div')
         .data(options)
         .enter()
         .append("div")
         .attr("class", "list-item")
         .text((d) => d)

};


export default update;