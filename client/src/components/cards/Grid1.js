import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsLightning } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";
import { fetchActivePowerData } from "../../actions/gridActions";

function Grid1() {
  const dispatch = useDispatch();
  const { activepower, loading } = useSelector((state) => state.grid);

  useEffect(() => {
    // Fetch activepower data initially and then at intervals
    const fetchDataInterval = setInterval(() => {
      dispatch(fetchActivePowerData());
    }, 5000);

    dispatch(fetchActivePowerData()); // Fetch initially

    return () => clearInterval(fetchDataInterval);
  }, [dispatch]);

  return (
    <div className="col">
      <div className="col">
        <div className="card bg-secondary border border-dark border-1 p-2 shadow">
          <h5 className="card-title fs-3 text-warning">
            <BsLightning />
          </h5>
          <h6 className="card-subtitle mb-2 text-white fs-5">
            ActivePower(DM)
          </h6>
          <h6 className="card-subtitle mb-2 text-warning fs-3">
            {loading ? (
              <Spinner animation="grow" variant="warning" />
            ) : activepower !== null ? (
              `${activepower} kW`
            ) : (
              "0 kW"
            )}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Grid1;
