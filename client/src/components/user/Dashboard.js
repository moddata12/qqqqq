import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import bgImg from "../../assets/bg-img.jpg";
import { Container } from "react-bootstrap"; // Ensure correct imports
import Carousel from "react-material-ui-carousel";
import Grid0 from "../cards/Grid0";
import Grid1 from "../cards/Grid1";
import Grid2 from "../cards/Grid2";
import Grid3 from "../cards/Grid3";
import Grid4 from "../cards/Grid4";
import Card0 from "../cards/Card0";
import Card1 from "../cards/Card1";
import Card2 from "../cards/Card2";
import Card3 from "../cards/Card3";
import Card4 from "../cards/Card4";
import Card5 from "../cards/Card5";
import Card6 from "../cards/Card6";
import Card7 from "../cards/Card7";
import Card8 from "../cards/Card8";
import Linechart from "../charts/Linechart";
import Barchart from "../charts/Barchart";
import Doughnutchart from "../charts/Doughnutchart";
import Accordion from "../accordion/Accordion";
import MetaData from "../layouts/MetaData";

function Dashboard() {
  return (
    <Fragment>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MetaData title={"Dashboard"} />
        <Container className="container text-center mt-2 mb-2 bg-light border border-primary border-3 rounded p-4">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            Dashboard
          </h3>
          <div className="row w-900 p-1 g-2">
            <Grid0 />
            <Grid1 />
            <Grid2 />
            <Grid3 />
            <Grid4 />
          </div>

          <div className="row">
            <div
              className="col-8 mt-3 border border-primary border-1 rounded mx-auto p-3 bg-white shadow"
              style={{ width: "730px" }}
            >
              <Linechart />
            </div>
            <div
              className="col-4 mt-3 border border-primary border-1 rounded mx-auto p-3 bg-white shadow"
              style={{ width: "350px" }}
            >
              <Doughnutchart />
            </div>
          </div>

          <Accordion />

          <div className="row">
            <div
              className="col-8 mt-3 border border-primary border-1 rounded mx-auto p-3 bg-white shadow"
              style={{ width: "730px" }}
            >
              <Barchart />
            </div>
            <div
              className="col-4 mt-3 border border-primary border-1 rounded mx-auto p-3 bg-white shadow"
              style={{ width: "350px", overflowY: "auto" }}
            >
              <h5 className="text-primary mb-2">All Panels</h5>
              <Carousel>
                <Card0 />
                <Card1 />
                <Card2 />
                <Card3 />
                <Card4 />
                <Card5 />
                <Card6 />
                <Card7 />
                <Card8 />
              </Carousel>
              <div className="d-flex justify-content-between">
                <h5 className="text-danger fs-5">*Online</h5>
                <h5 className="text-success fs-5">*Offline</h5>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  );
}

export default Dashboard;
