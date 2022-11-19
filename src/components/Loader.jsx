import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        backgroundColor: "orange",
        height: "100vh",
        width: "100%",
        position: "absolute",
        // top: "10vh",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div class="simple-spinner">
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
