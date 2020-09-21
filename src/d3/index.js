import React, { useEffect } from "react";
import "./styles.css";
import { drawChart } from "./bar";

var width = 600;
var height = 400;

export default function D3Chart() {
  useEffect(() => {
    drawChart(width, height);
  }, []);

  return (
    <div className="App">
      <h1>D3 Bar Chart</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div id="chart"></div>
    </div>
  );
}
