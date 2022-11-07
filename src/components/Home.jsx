import React from "react";
import Cards from "./Cards";
import searchicon from "../images/home/searchicon.svg";
const Home = ({ homeProps: { postData } }) => {
  console.log("Home rendered");
  // const image =
  //   URL.createObjectURL()
  // Implement nav hide on focus on home
  // const image = "";
  console.log("Post data from home" + postData);
  console.log(postData);
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
      className="home--supercontainer"
    >
      <div className="home--section1">
        <div className="home--section1--1">
          <div className="home--search">
            <input type="text" placeholder="Search here..." />
            <img src={searchicon} alt="" />
          </div>
          <div className="home--popular">
            <div className="home--popular--heading">Popular</div>
          </div>
          <div className="home--new">
            <div className="home--new--heading">New</div>
          </div>
          <div className="home--recent">
            <div className="home--recent--heading">Recent</div>{" "}
          </div>
        </div>
        <div className="home--section1--2">
          <div className="home--carousel">Carousel</div>
          <div className="home--cards">
            <Cards />
          </div>
        </div>
      </div>

      {/* Home
      <img src={image} alt="" /> */}
    </div>
  );
};

export default Home;
