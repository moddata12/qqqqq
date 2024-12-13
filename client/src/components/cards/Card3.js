import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

function Card3() {
  function convertToIndianTime(utcDateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };

    const date = new Date(utcDateString);
    const indianTime = date.toLocaleString("en-IN", options);
    return indianTime;
  }

  const [meterData, setMeterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeterData = async () => {
      try {
        const response = await axios.get("/api/v1/getCard3");
        setMeterData(response.data);
      } catch (error) {
        console.error("Error fetching meter data:", error);
        setError("Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchDataInterval = setInterval(fetchMeterData, 5000);
    fetchMeterData();
    return () => clearInterval(fetchDataInterval);
  }, []);

  if (loading) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center vh-75">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "400px", width: "200px" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        Please try again.
      </div>
    );
  }

  return (
    <div className="rounded mx-auto" style={{ maxWidth: "350px" }}>
      <div className="card mb-5 mt-2">
        {meterData.map((entry) => (
          <div key={entry._id} className="card">
            <div className="card-body bg-light border border-primary border-3 rounded">
              {entry.measurements.map((meter, index) => (
                <div key={index}>
                  <h5
                    className={`card-title shadow-sm p-3 mb-3 bg-body-primary text-white rounded ${
                      meter.voltage === 0 && meter.current === 0
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {meter.panelname || "APFC Panel"}
                  </h5>
                  <p className="card-text d-flex justify-content-between fw-medium mb-1">
                    Voltage: <span>{meter.voltage || 0} V</span>
                  </p>
                  <p className="card-text d-flex justify-content-between fw-medium mb-1">
                    Current: <span>{meter.current || 0} A</span>
                  </p>
                  <p className="card-text d-flex justify-content-between fw-medium mb-1">
                    Active Power: <span>{meter.activepowerh || 0} kWh</span>
                  </p>
                  <p className="card-text d-flex justify-content-between fw-medium mb-1">
                    Apparent Power:{" "}
                    <span>{meter.apparentpowerh || 0} kVAh</span>
                  </p>
                  <p className="card-text d-flex justify-content-between fw-medium mb-1">
                    Reactive Power:{" "}
                    <span>{meter.reactivepowerh || 0} kVARh</span>
                  </p>
                  <p className="card-text d-flex justify-content-between fw-medium mb-1">
                    Power Factor: <span>{meter.powerfactor || 0} PF</span>
                  </p>
                  <p className="card-text d-flex justify-content-between fw-medium mb-1">
                    Frequency: <span>{meter.frequency || 0} Hz</span>
                  </p>
                  <p className="card-text d-flex justify-content-between fw-medium mb-1">
                    Location: <span>{meter.location || "Near Entrance"}</span>
                  </p>
                  <p className="card-text fw-medium">
                    {convertToIndianTime(entry.datetime)}
                  </p>
                </div>
              ))}

              <div className="d-flex justify-content-center mt-2">
                <a href="/table/report3" className="btn btn-primary">
                  View
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card3;
