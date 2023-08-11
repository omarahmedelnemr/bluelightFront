// src/components/PieChart.js
import React from "react";
import { Pie as PieJS } from "react-chartjs-2";

function PieChart({ chartData,title }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      <PieJS
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
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