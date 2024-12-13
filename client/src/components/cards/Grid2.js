import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsLightningCharge } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";
import { fetchReactivePowerData } from "../../actions/gridActions";

function Grid2() {
  const dispatch = useDispatch();
  const { reactivepower, loading } = useSelector((state) => state.grid);

  useEffect(() => {
    // Fetch reactivepower data initially and then at intervals
    const fetchDataInterval = setInterval(() => {
      dispatch(fetchReactivePowerData());
    }, 5000);

    dispatch(fetchReactivePowerData()); // Fetch initially

    return () => clearInterval(fetchDataInterval);
  }, [dispatch]);

  return (
    <div className="col">
      <div className="col">
        <div className="card bg-secondary border border-dark border-1 p-2 shadow">
          <h5 className="card-title fs-3 text-warning">
            <BsLightningCharge />
          </h5>
          <h6 className="card-subtitle mb-2 text-white fs-5">
            ReactivePower(DM)
          </h6>
          <h6 className="card-subtitle mb-2 text-warning fs-3">
            {loading ? (
              <Spinner animation="grow" variant="warning" />
            ) : reactivepower !== null ? (
              `${reactivepower} kVAR`
            ) : (
              "0 kVAR"
            )}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Grid2;
