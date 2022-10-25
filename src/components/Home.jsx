import React from "react";
const Home = () => {
  console.log("Home rendered");
  // const image =
  //   URL.createObjectURL()
  // Implement nav hide on focus on home
  const image = "";
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
      <img src={image} alt="" />
    </div>
  );
};

export default Home;
