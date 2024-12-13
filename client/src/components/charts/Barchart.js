import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// Import the chartjs-plugin-datalabels for displaying data values
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels // Register the plugin
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
  return date.toLocaleString("en-IN", options);
}

// Function to aggregate data by day
function aggregateDataByDay(data) {
  const aggregatedData = {};

  data.forEach((item) => {
    const date = convertToIndianTime(item.datetime).split(",")[0]; // Get only the date part
    if (!aggregatedData[date]) {
      aggregatedData[date] = {
        activePower: 0,
        apparentPower: 0,
        count: 0,
      };
    }
    // Sum the values for each day
    aggregatedData[date].activePower += item.measurements[0].activepowerri || 0;
    aggregatedData[date].apparentPower +=
      item.measurements[0].apparentpoweri || 0;
    aggregatedData[date].count += 1;
  });

  // Calculate average for each day
  const labels = Object.keys(aggregatedData);
  const activePower = labels.map(
    (date) => aggregatedData[date].activePower / aggregatedData[date].count
  );
  const apparentPower = labels.map(
    (date) => aggregatedData[date].apparentPower / aggregatedData[date].count
  );

  return { labels, activePower, apparentPower };
}

const BarChart = () => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState("R"); // Default to R Phase

  const fetchData = useCallback(() => {
    axios
      .get("/api/v1/measurements")
      .then((response) => {
        const data = response.data;
        if (data && data.length > 0) {
          const measurements = {
            R: {
              activePower: data.map(
                (item) => item.measurements[0].activepowerri
              ),
              apparentPower: data.map(
                (item) => item.measurements[0].apparentpowerri
              ),
            },
            Y: {
              activePower: data.map(
                (item) => item.measurements[0].activepoweryi
              ),
              apparentPower: data.map(
                (item) => item.measurements[0].apparentpoweryi
              ),
            },
            B: {
              activePower: data.map(
                (item) => item.measurements[0].activepowerbi
              ),
              apparentPower: data.map(
                (item) => item.measurements[0].apparentpowerbi
              ),
            },
          };

          // Aggregate data by day
          const { labels } = aggregateDataByDay(data);

          // Update chart based on the selected phase
          setBarChartData({
            labels: labels,
            datasets: [
              {
                label: `Active Power ${selectedPhase} Phase (kW)`,
                data: measurements[selectedPhase].activePower,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
              {
                label: `Apparent Power ${selectedPhase} Phase (kVA)`,
                data: measurements[selectedPhase].apparentPower,
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
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
  }, [selectedPhase]);

  useEffect(() => {
    const fetchDataInterval = setInterval(fetchData, 5000);
    fetchData();
    return () => clearInterval(fetchDataInterval);
  }, [fetchData]);

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Power (kW/kVA)", // Title for the y-axis
        },
      },
      x: {
        title: {
          display: true,
          text: "Date", // Title for the x-axis
        },
        beginAtZero: true,
        grace: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
      // Enable the datalabels plugin
      datalabels: {
        display: true,
        color: "black",
        font: {
          weight: "bold",
        },
        anchor: "end", // Position the label at the top of the bar
        align: "top",
      },
    },
  };

  const handlePhaseChange = (phase) => {
    setSelectedPhase(phase);
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}

      <div className="d-flex justify-content-center my-3">
        <button
          className={`btn btn-danger mx-2 ${
            selectedPhase === "R" ? "active" : ""
          }`}
          onClick={() => handlePhaseChange("R")}
        >
          R Phase
        </button>
        <button
          className={`btn btn-warning mx-2 ${
            selectedPhase === "Y" ? "active" : ""
          }`}
          onClick={() => handlePhaseChange("Y")}
        >
          Y Phase
        </button>
        <button
          className={`btn btn-primary mx-2 ${
            selectedPhase === "B" ? "active" : ""
          }`}
          onClick={() => handlePhaseChange("B")}
        >
          B Phase
        </button>
      </div>

      <div
        className="chart mt-3 mb-3"
        style={{ width: "100%", height: "60vh" }}
      >
        <h4>EB Incomer Power(Instantaneous)</h4>
        <Bar data={barChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default BarChart;
