import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

const Spinner = () => {
  return (
    <MDBSpinner
      className=""
      style={{ width: "3rem", height: "3rem", margin:"0 auto" }}
    >
      <span className="visually-hidden">Loading...</span>
    </MDBSpinner>
  );
};

export default Spinner;
