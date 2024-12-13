import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler
);

// Function to convert UTC date/time to Indian Standard Time
function convertToIndianTime(utcDateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata", // Indian Standard Time
  };

  const date = new Date(utcDateString);
  const indianTime = date.toLocaleString("en-IN", options);
  return indianTime;
}

const Linechart = () => {
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Active Power Average (kWh)",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "green",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Apparent Power Average (kVAh)",
        data: [],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "red",
        tension: 0.4,
        fill: false,
      },
    ],
  });

  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    axios
      .get("/api/v1/measurements")
      .then((response) => {
        const data = response.data;
        if (data && data.length > 0) {
          const labels = data.map((item) => convertToIndianTime(item.datetime));
          const powerData = data.map(
            (item) => item.measurements[0].activepower
          );
          const apparentPowerData = data.map(
            (item) => item.measurements[0].apparentpower
          );
          setLineChartData({
            ...lineChartData,
            labels: labels,
            datasets: [
              {
                ...lineChartData.datasets[0],
                data: powerData,
              },
              {
                ...lineChartData.datasets[1],
                data: apparentPowerData,
              },
            ],
          });
        }
        setError(null); // Clear error if successful
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Please try again.");
      });
  }, [lineChartData]);

  useEffect(() => {
    const fetchDataInterval = setInterval(fetchData, 5000);
    fetchData();
    return () => clearInterval(fetchDataInterval);
  }, [fetchData]);

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Power (kWh/kVAh)", // Title for the y-axis
        },
      },
      x: {
        title: {
          display: true,
          text: "Time", // Title for the x-axis
        },
        grace: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top", // Adjust position as needed
      },
      tooltip: {
        enabled: true,
        mode: "index", // display one tooltip per data point
        intersect: false,
      },
    },
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <div
        className="chart mt-3 mb-3"
        style={{ width: "100%", height: "60vh" }}
      >
        <h4>EB Incomer Power(Average)</h4>
        <Line data={lineChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Linechart;
