
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

const TemperatureChart = ({ weatherData, selectedRange }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  

  useEffect(() => {
    if (weatherData && weatherData.list && weatherData.list.length > 0) {
      let daysToDisplay = 30; 

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
        chartInstance.destroy(); 
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
                  above: "rgba(255, 235, 59, 0.5)", 
                  below: "rgba(255, 255, 255, 0)", 
                },
                borderColor: "rgb(255, 235, 59)", 
                borderWidth: 2,
                pointBackgroundColor: "rgb(255, 235, 59)", 
                pointRadius: 0, 
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
                    day: "MMM d",
                  },
                  tooltipFormat: "MMM d",
                },
                title: {
                  display: false,
                },
                grid: {
                  display: false, 
                },
                ticks: {
                  display: false, 
                },
              },
              y: {
                display: false, 
              },
            },
            plugins: {
              legend: {
                display: false, 
              },
            },
            elements: {
              line: {
                tension: 0, 
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
