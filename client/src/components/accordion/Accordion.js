import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccordionData } from "../../actions/accordionActions";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import "./style.css";

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

function millisecondsToDHMS(milliseconds) {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

const MyAccordion = () => {
  const dispatch = useDispatch();
  // const { accordion: measurementData, loading, error } = useSelector((state) => state.accordion);
  const { accordion: measurementData } = useSelector(
    (state) => state.accordion
  );

  useEffect(() => {
    dispatch(fetchAccordionData());
  }, [dispatch]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  const dg1RunningTime = millisecondsToDHMS(
    measurementData?.totalTimeDifference2_1 || 0
  );
  const lastUpdatedMid2 = measurementData?.lastUpdatedMid2
    ? convertToIndianTime(measurementData.lastUpdatedMid2)
    : "N/A";
  const lastUpdatedMid1 = measurementData?.lastUpdatedMid1
    ? convertToIndianTime(measurementData.lastUpdatedMid1)
    : "N/A";

  return (
    <div className="mt-3 mb-3 container p-1 rounded border border-primary border-1 shadow">
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h5 className="d-flex justify-content-center text-white bg-primary p-2 rounded">
              Generator Consumption Time
            </h5>
          </Accordion.Header>
          <Accordion.Body>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h5 className="d-flex justify-content-center text-dark">
                    Generator Running Time
                  </h5>
                </Accordion.Header>
                <Accordion.Body>
                  <h6 className="bg-light p-3 text-dark rounded">
                    Last updated time of Generator - {lastUpdatedMid2} <br />
                    Last updated time of EB Incomer - {lastUpdatedMid1} <br />
                    Total Running time of Generator - {dg1RunningTime.days}{" "}
                    days, {dg1RunningTime.hours} hours, {dg1RunningTime.minutes}{" "}
                    minutes, {dg1RunningTime.seconds} seconds
                  </h6>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default MyAccordion;
