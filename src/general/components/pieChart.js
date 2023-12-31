// src/components/PieChart.js
import React from "react";
import { Pie as PieJS } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function PieChart({ chartData,title }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      <PieJS
        data={chartData}
        options={{
          plugins: {
            title: {
              // display: true,
              // text: title
            },datalabels: {
                color: '#36A2EB'
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;