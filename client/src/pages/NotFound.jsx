import React from "react";
import empty from "../assets/404.jpg";

export const NotFound = () => {
  return (
    <div>
      <img
        style={{
          maxWidth: "100%",
        //   maxHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems:"center"
        }}
        src={empty}
        alt="not found"
      />
    </div>
  );
};
