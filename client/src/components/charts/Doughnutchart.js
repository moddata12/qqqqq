import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = () => {
  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: [
      "Voltage (V)",
      "Current (A)",
      "Power Factor (ϕ)",
      "Frequency (Hz)",
    ],
    datasets: [
      {
        data: [0, 0, 0, 0], // Placeholder values
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(127, 0, 66, 0.5)",
          "rgba(85, 136, 106, 0.5)",
        ],
        hoverOffset: 4,
      },
    ],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataInterval = setInterval(fetchLatestMeterData, 5000);
    fetchLatestMeterData(); // Fetch data immediately on mount
    return () => clearInterval(fetchDataInterval); // Cleanup interval
  }, []);

  const fetchLatestMeterData = () => {
    axios
      .get("/api/v1/getLatestMeterData")
      .then((response) => {
        const data = response.data[0]; // Adjust based on actual API response
        if (data) {
          const { voltage, current, powerfactor, frequency } = data;
          setDoughnutChartData((prevState) => ({
            ...prevState,
            datasets: [
              {
                ...prevState.datasets[0],
                data: [voltage, current, powerfactor, frequency],
              },
            ],
          }));
          setError(null); // Clear error if successful
        } else {
          throw new Error("Invalid data format.");
        }
      })
      .catch((err) => {
        console.error("Error fetching latest meter data:", err);
        setError("Please try again.");
      });
  };

  return (
    <div className="chart mt-3 mb-3" style={{ width: "100%", height: "60vh" }}>
      {error && <div className="error text-danger">{error}</div>}
      <h4>Average Parameters</h4>
      <Doughnut data={doughnutChartData} />
    </div>
  );
};

export default DoughnutChart;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Doughnut } from "react-chartjs-2";

// const DoughnutChart = () => {
//   const [doughnutChartData, setDoughnutChartData] = useState({
//     labels: ["Voltage(V)", "Current(A)", "Powerfactor(ϕ)", "Frequency(Hz)"],
//     datasets: [
//       {
//         data: [0, 0, 0, 0],
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.5)",
//           "rgba(54, 162, 235, 0.5)",
//           "rgba(127, 0, 66, 0.5)",
//           "rgba(85, 136, 106, 0.5)",
//         ],
//         hoverOffset: 4,
//       },
//     ],
//   });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDataInterval = setInterval(fetchLatestMeterData, 5000);
//     // Fetch data immediately when component mounts
//     fetchLatestMeterData();
//     return () => clearInterval(fetchDataInterval);
//   }, []);

//   const fetchLatestMeterData = () => {
//     axios
//       .get("/api/v1/getLatestMeterData")
//       .then((response) => {
//         const { data } = response;
//         //console.log("Fetched data:", data);
//         if (data && data.length > 0 && data[0].measurements.length > 0) {
//           const latestMeasurement = data[0].measurements[0];
//           const { voltage, current, powerfactor, frequency } = latestMeasurement;
//           //console.log("Latest measurement:", latestMeasurement);
//           setDoughnutChartData((prevState) => ({
//             ...prevState,
//             datasets: [
//               {
//                 ...prevState.datasets[0],
//                 data: [voltage, current, powerfactor, frequency],
//               },
//             ],
//           }));
//           setError(null); // Reset error state if data is fetched successfully
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching latest meter data:", error);
//         setError("Please try again."); // Set error message
//       });
//   };

//   return (
//     <div className="chart mt-3 mb-3" style={{ width: "100%", height: "60vh" }}>
//       {error && <div className="error text-danger">{error}</div>}
//       <h4>Average</h4>
//       <Doughnut data={doughnutChartData} />
//     </div>
//   );
// };

// export default DoughnutChart;
