import React, { Fragment, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Spinner,
  Toast,
  ToastContainer,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import { writeFile, utils } from "xlsx";
import bgImg from "../../assets/bg-img.jpg";
import MetaData from "../layouts/MetaData";

// Function to convert UTC date strings to Indian Standard Time
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
  return date.toLocaleString("en-IN", options);
}

function Report4() {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/Report4Data");
        if (!response.ok) throw new Error("Network response was not ok");
        const { allDocuments } = await response.json();
        setTableData(Array.isArray(allDocuments) ? allDocuments : []);
        setFilteredData(Array.isArray(allDocuments) ? allDocuments : []);
      } catch (error) {
        setToastMessage("Failed to fetch data. Please try again later.");
        setTableData([]);
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = tableData;

    if (timeFilter === "hourly") {
      const oneHourAgo = new Date(new Date().getTime() - 60 * 60 * 1000);
      filtered = tableData.filter(
        (doc) => new Date(doc.datetime) >= oneHourAgo
      );
    } else if (timeFilter === "weekly") {
      const oneWeekAgo = new Date(
        new Date().getTime() - 7 * 24 * 60 * 60 * 1000
      );
      filtered = tableData.filter(
        (doc) => new Date(doc.datetime) >= oneWeekAgo
      );
    } else if (timeFilter === "monthly") {
      const oneMonthAgo = new Date(
        new Date().getTime() - 30 * 24 * 60 * 60 * 1000
      );
      filtered = tableData.filter(
        (doc) => new Date(doc.datetime) >= oneMonthAgo
      );
    }

    if (fromDate && toDate) {
      const fromTime = new Date(fromDate);
      const toTime = new Date(toDate);
      filtered = filtered.filter((doc) => {
        const docDate = new Date(doc.datetime);
        return docDate >= fromTime && docDate <= toTime;
      });
    }

    setFilteredData(filtered);
  }, [timeFilter, fromDate, toDate, tableData]);

  const dataTable = {
    columns: [
      { label: "Date/Time", field: "datetime", sort: "asc" },
      { label: "Voltage(V)", field: "voltage", sort: "asc" },
      { label: "Current(A)", field: "current", sort: "asc" },
      { label: "Active Power(kWh)", field: "activepower", sort: "asc" },
      { label: "Apparent Power(kVAh)", field: "apparentpower", sort: "asc" },
      { label: "Reactive Power(kVARh)", field: "reactivepower", sort: "asc" },
      { label: "Power Factor(PF)", field: "powerfactor", sort: "asc" },
      { label: "Frequency(Hz)", field: "frequency", sort: "asc" },
      { label: "Panel Name", field: "panelname", sort: "asc" },
      { label: "Location", field: "location", sort: "asc" },
    ],
    rows: filteredData.map((doc) => ({
      datetime: convertToIndianTime(doc.datetime),
      voltage: doc.measurements?.[0]?.voltage || 0,
      current: doc.measurements?.[0]?.current || 0,
      activepower: doc.measurements?.[0]?.activepower || 0,
      apparentpower: doc.measurements?.[0]?.apparentpower || 0,
      reactivepower: doc.measurements?.[0]?.reactivepower || 0,
      powerfactor: doc.measurements?.[0]?.powerfactor || 0,
      frequency: doc.measurements?.[0]?.frequency || 0,
      panelname: doc.measurements?.[0]?.panelname || "N/A",
      location: doc.measurements?.[0]?.location || "N/A",
    })),
  };

  const handleExportToExcel = () => {
    const ws = utils.json_to_sheet(
      filteredData.map((doc) => ({
        "Date/Time": convertToIndianTime(doc.datetime),
        "Voltage(V)": doc.measurements?.[0]?.voltage || 0,
        "Current(A)": doc.measurements?.[0]?.current || 0,
        "Active Power(kWh)": doc.measurements?.[0]?.activepowerh || 0,
        "Apparent Power(kVAh)": doc.measurements?.[0]?.apparentpowerh || 0,
        "Reactive Power(kVARh)": doc.measurements?.[0]?.reactivepowerh || 0,
        "Power Factor(PF)": doc.measurements?.[0]?.powerfactor || 0,
        "Frequency(Hz)": doc.measurements?.[0]?.frequency || 0,
        "Panel Name": doc.measurements?.[0]?.panelname || "N/A",
        Location: doc.measurements?.[0]?.location || "N/A",
      }))
    );
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Reports");
    const panelName = filteredData[0]?.measurements?.[0]?.panelname || "Report";
    writeFile(wb, `${panelName}_Data.xlsx`);
  };

  return (
    <Fragment>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <MetaData title="Reports" />
        <Container
          className="bg-light border border-primary rounded p-4 shadow-lg"
          style={{ maxWidth: "90%", width: "1200px" }}
        >
          <h3 className="bg-primary text-white text-center rounded py-2 mb-4">
            Reports
          </h3>
          <div className="bg-white border border-primary border-1 rounded p-2 mt-2 mb-2">
            <Row className="mb-4">
              <Col md={4} xs={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Time Filter</Form.Label>
                  <Form.Select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="hourly">Last Hour</option>
                    <option value="weekly">Last Week</option>
                    <option value="monthly">Last Month</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4} xs={12} className="mb-3">
                <Form.Group>
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    disabled={timeFilter === "all"}
                  />
                </Form.Group>
              </Col>
              <Col md={4} xs={12} className="mb-3">
                <Form.Group>
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    disabled={timeFilter === "all"}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="success"
              onClick={handleExportToExcel}
              className="mb-4 w-100"
            >
              <i className="fas fa-download me-2"></i>Download Excel
            </Button>
          </div>

          <div className="bg-white border border-primary border-1 rounded p-2 mt-2 mb-2">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <div className="table-responsive">
                <MDBDataTable striped bordered small hover data={dataTable} />
              </div>
            )}
          </div>
        </Container>

        {toastMessage && (
          <ToastContainer position="top-end" className="p-3">
            <Toast
              onClose={() => setToastMessage("")}
              show={toastMessage}
              delay={3000}
              autohide
            >
              <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
          </ToastContainer>
        )}
      </div>
    </Fragment>
  );
}

export default Report4;
