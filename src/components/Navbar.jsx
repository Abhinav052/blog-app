import React from "react";
// import setInterceptorHeader from "../axios/postinterceptor.js";
import { Outlet, Link } from "react-router-dom";
import hamburgeropen from "../images/navbar/hamburgeropen.png";
const Navbar = ({ navProps }) => {
  // async function handleGigachad(event) {
  //   event.preventDefault();
  //   try {
  //     const res = await setInterceptorHeader.post("/gigachad");
  //     // console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  //
  //      DESTRUCTURE PROPS HERE
  //
  console.log(navProps);
  const {
    windowSize,
    activeUser: { username, userSignedIn },
  } = navProps;

  const [isOpen, setIsOpen] = React.useState(false);
  function handleMobMenu() {
    setIsOpen((prevValue) => !prevValue);
  }

  return (
    <>
      <div className="nav--supercontainer">
        <div className="nav--container">
          <div className="nav--title">Bloggo</div>
          <ul className="nav--menu">
            <Link
              to={"/"}
              style={{ textDecoration: "none", height: "50%", color: "white" }}
            >
              <li className="nav--menuitems">Home</li>
            </Link>
            <li className="nav--menuitems">Category</li>
            <Link
              to={"/create"}
              style={{ textDecoration: "none", height: "50%", color: "white" }}
            >
              <li className="nav--menuitems">Post Blog</li>
            </Link>
            <li className="nav--menuitems">About</li>
          </ul>
          <div className="nav--username">
            Welcome, {username.charAt(0).toUpperCase() + username.slice(1)}
          </div>
          <Link to={"/auth"} style={{ textDecoration: "none", height: "50%" }}>
            <button className="nav--auth">{`${
              userSignedIn ? "Logout" : "Login"
            }`}</button>
          </Link>

          {windowSize.innerWidth < 480 && (
            <img
              src={hamburgeropen}
              alt=""
              className={`nav--hamburgeropen ${
                isOpen ? "nav--hamburger--on" : ""
              }`}
              onClick={handleMobMenu}
            />
          )}

          {/* <button onClick={handleGigachad}>Access GigaChad</button> */}
        </div>
        <div className={`nav--mob--container ${isOpen ? "nav--mob--on" : ""}`}>
          <ul className="nav--mob--menu">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <li className="nav--mob--menuitems">Home</li>
            </Link>
            <li className="nav--mob--menuitems">Category</li>
            <Link
              to={"/create"}
              style={{ textDecoration: "none", height: "50%", color: "white" }}
            >
              {" "}
              <li className="nav--mob--menuitems">Post Blog</li>
            </Link>
            <li className="nav--mob--menuitems">About</li>
            <Link to={"/auth"} style={{ textDecoration: "none" }}>
              <li className="nav--mob--auth">Login</li>
            </Link>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
