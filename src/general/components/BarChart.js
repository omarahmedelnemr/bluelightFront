import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const BarChart = ({ data }) => {
  const options = {
    // Configure chart options here
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
