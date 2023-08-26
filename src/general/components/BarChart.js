import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const BarChart = ({ chartData,title }) => {

  return <Bar data={chartData}         
  options={{
    plugins: {
      title: {
        display: true,
        text: title
      },datalabels: {
          color: '#36A2EB'
      }
    }
  }} />;
};

export default BarChart;
