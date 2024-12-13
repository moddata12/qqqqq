import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsExclamationTriangle } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";
import { fetchApparentPowerData } from "../../actions/gridActions";

function Grid0() {
  const dispatch = useDispatch();
  const { apparentpower, loading } = useSelector((state) => state.grid);

  useEffect(() => {
    // Fetch apparentpower data initially and then at intervals
    const fetchDataInterval = setInterval(() => {
      dispatch(fetchApparentPowerData());
    }, 5000);

    dispatch(fetchApparentPowerData()); // Fetch initially

    return () => clearInterval(fetchDataInterval);
  }, [dispatch]);

  return (
    <div className="col">
      <div className="col">
        <div className="card bg-secondary border border-dark border-1 p-2 shadow">
          <h5 className="card-title fs-3 text-warning">
            <BsExclamationTriangle />
          </h5>
          <h6 className="card-subtitle mb-2 text-white fs-5">
            ApparentPower(DM)
          </h6>
          <h6 className="card-subtitle mb-2 text-warning fs-3">
            {loading ? (
              <Spinner animation="grow" variant="warning" />
            ) : apparentpower !== null ? (
              `${apparentpower} kVA`
            ) : (
              "0 kVA"
            )}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Grid0;
