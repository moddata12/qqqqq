import { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import bgImg from "../../assets/bg-img.jpg";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { getDetails } from "../../actions/detailActions";

const Details = () => {
  const dispatch = useDispatch();
  const { details, loading, error } = useSelector((state) => state.detailState);

  useEffect(() => {
    dispatch(getDetails());
  }, [dispatch]);

  return (
    <Fragment>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MetaData title={"Details"} />
        <Container className="container text-center mt-2 mb-2 bg-light border border-primary border-3 rounded p-4">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            Details
          </h3>
          <div className="bg-white shadow fw-medium fs-1 mt-2 mb-3 border border-primary border-1 rounded">
            <div className="text-primary">
              <p className="fs-3 mb-2 d-flex justify-content-center">
                KRISHCA STRAPING SOLUTIONS PVT LTD,
              </p>
              <h5 className="fs-5 mt-2 text-muted d-flex justify-content-center">
                BUILDING 01B, CASA GRANDE DISTRIPARK, SATHARAI VILLAGE, MAPPEDU,
                THIRUVALLUR DISTRICT, <br />
                TAMILNADU - 631 203.
              </h5>
            </div>
          </div>

          <div className="bg-white border border-primary border-1 rounded p-2 mt-2 mb-2">
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : error ? (
              <div className="text-danger">{error}</div>
            ) : (
              // <Table striped bordered hover size="sm">
              <Table striped bordered hover size="sm" responsive="sm">
                <thead
                  style={{ backgroundColor: "#007bff", color: "#fff" }}
                  className="fs-5 p-3"
                  id="header"
                >
                  <tr>
                    <th>Meter ID</th>
                    <th>Incoming Source</th>
                    <th>Panel Name</th>
                    <th>Breaker Type</th>
                    <th>Utility</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.meterid}</td>
                      <td>{detail.incomingsource}</td>
                      <td>{detail.plname}</td>
                      <td>{detail.breakertype}</td>
                      <td>{detail.utility}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default Details;
