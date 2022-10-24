import React from "react";
const Home = () => {
  console.log("Home rendered");
  // Implement nav hide on focus on home
  return (
    <div
      style={{
        backgroundColor: "orange",
        height: "100vh",
        width: "100%",
        position: "absolute",
        top: "10vh",
        background: "rgb(48, 25, 52)",
      }}
    >
      Home
    </div>
  );
};

export default Home;
