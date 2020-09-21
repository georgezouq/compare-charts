import * as d3 from "d3";

const margin = { top: 30, right: 0, bottom: 30, left: 40 };

const data = [
  { name: "A", value: 123 },
  { name: "b", value: 234 },
  { name: "c", value: 345 },
  { name: "d", value: 567 },
  { name: "e", value: 789 },
  { name: "f", value: 123 },
  { name: "g", value: 123 },
  { name: "h", value: 123 }
];

const view = d3
  .select("#chart")
  .append("svg")
  .style("border", "1px solid black");

export function drawChart(width, height) {
  view.attr("viewBox", [0, 0, width, height]);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const xAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .tickFormat((i) => data[i].name)
        .tickSizeOuter(0)
    );

  const yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, "%"))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(data.y)
      );

  view
    .append("g")
    .attr("fill", "#123")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d.value))
    .attr("height", (d) => y(0) - y(d.value))
    .attr("width", x.bandwidth());

  view.append("g").call(xAxis);
  view.append("g").call(yAxis);
}
