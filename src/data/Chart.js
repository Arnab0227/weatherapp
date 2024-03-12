// TemperatureChart.js
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

const TemperatureChart = ({ weatherData, selectedRange }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  

  useEffect(() => {
    if (weatherData && weatherData.list && weatherData.list.length > 0) {
      let daysToDisplay = 30; // Default to last month

      if (selectedRange === "lastWeek") {
        daysToDisplay = 7;
      } else if (selectedRange === "last15Days") {
        daysToDisplay = 15;
      }

      const temperatureData = weatherData.list
        .slice(0, daysToDisplay)
        .map((dailyData) => ({
          x: new Date(dailyData.dt * 1000),
          y: Math.round(dailyData.main.temp),
        }));

      const ctx = chartRef.current;

      if (chartInstance) {
        chartInstance.destroy(); // Destroy existing chart instance
      }

      setChartInstance(
        new Chart(ctx, {
          type: "line",
          data: {
            datasets: [
              {
                label: "Temperature (°C)",
                data: temperatureData,
                fill: {
                  target: "origin",
                  above: "rgba(255, 235, 59, 0.5)", // deep yellow
                  below: "rgba(255, 255, 255, 0)", // light yellow (transparent)
                },
                borderColor: "rgb(255, 235, 59)", // deep yellow
                borderWidth: 2,
                pointBackgroundColor: "rgb(255, 235, 59)", // deep yellow
                pointRadius: 0, // Hide point markers
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                  displayFormats: {
                    day: "MMM d", // Use 'd' for the day of the month
                  },
                  tooltipFormat: "MMM d", // Use 'd' for the day of the month in the tooltip
                },
                title: {
                  display: false,
                },
                grid: {
                  display: false, // Hide grid lines
                },
                ticks: {
                  display: false, // Hide x-axis ticks
                },
              },
              y: {
                display: false, // Hide y-axis
              },
            },
            plugins: {
              legend: {
                display: false, // Hide legend
              },
            },
            elements: {
              line: {
                tension: 0, // Disable bezier curve tension
              },
            },
          },
        })
      );
    }
  }, [weatherData, selectedRange]);

  return (
    <div>
      
      <canvas ref={chartRef} width="100%" height="60"></canvas>
    </div>
  );
};

export default TemperatureChart;
