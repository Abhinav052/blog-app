import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import styled from "styled-components";
// import ellipseBig from "../images/auth/ellipseBig.svg";
// import subtract from "../images/auth/Subtract.svg";
// import polygon1 from "../images/auth/Polygon1.svg";
// import polygon2 from "../images/auth/Polygon2.svg";
// import polygon3 from "../images/auth/Polygon3.svg";
const Auth = ({ authProps }) => {
  // console.log(authProps);
  const navigate = useNavigate();

  //
  //      DESTRUCTURE PROPS HERE
  //

  const { windowSize, setActiveUser } = authProps;
  const [signIn, setSignIn] = React.useState(false);

  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  function handleClose() {
    navigate("/");
  }

  function handleMode() {
    setSignIn((prev) => !prev);
  }

  function handleForm(event) {
    const value = event.target.value;
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: value,
      };
    });
  }
  console.log(formData);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!signIn) {
      // console.log("Submit function execudted");

      if (!(formData.email && formData.password)) {
        alert("Please fill all elements");
      } else {
        try {
          const res = await axios.post("http://localhost:8000/api/auth/login", {
            email: formData.email,
            password: formData.password,
          });
          const { status, auth, data } = res.data;
          if (status === "success") {
            localStorage.setItem("auth", JSON.stringify(auth));
            localStorage.setItem("data", JSON.stringify(data));
            console.log("Signed In");
            setActiveUser((prev) => {
              return {
                ...prev,
                username: data.username.split(" ")[0],
                userSignedIn: true,
                email: data.email,
              };
            });
            navigate("/");
          }
          // console.log(status);
          // console.log();
          // console.log(accessToken);
          // console.log("Response auth" + auth.accessToken);
          // console.log(JSON.parse(localStorage.getItem("auth")));
        } catch (error) {
          console.log("Cannot Submit" + error);
        }
        console.log("signIn form");
      }
    } else {
      // signUp Form
      console.log("Sign up form");
      if (
        !(
          formData.username &&
          formData.email &&
          formData.password &&
          formData.confirmpassword
        )
      ) {
        alert("Please fill all elements");
      } else if (formData.password !== formData.confirmpassword) {
        (async () => {
          await setFormData((prevData) => {
            return {
              ...prevData,
              password: "",
              confirmpassword: "",
            };
          });
        })();
        alert("passwords do not match");
      } else {
        try {
          const res = await axios.post(
            "http://localhost:8000/api/auth/signup",
            {
              username: formData.username,
              email: formData.email,
              password: formData.password,
            }
          );

          //IF SUCCESSFULLY CREATED THEN CLEAR FORM
          //CHECK CONDITION BELOW

          if (true) {
            setFormData({
              username: "",
              email: "",
              password: "",
              confirmpassword: "",
            });
            setSignIn((prev) => !prev);
          }
          console.log(res.data);
        } catch (error) {
          console.log("Failed to create" + error);
        }
      }
    }
  }

  //=============================================================================================================================================
  // ============================================================ DYNAMIC STYLING ===============================================================
  //=============================================================================================================================================

  // const parentstyle = {
  //   "@media (max-width: 500px)": {
  //     display: "none",
  //   },
  // };

  // const Parent = styled.div`
  //   @media screen and (max-width: 480px) :;
  // `;

  return (
    <div
      className={`auth--parent ${
        signIn && windowSize.innerWidth <= 480 ? "auth--parent--mobile" : ""
      }`}
      style={{}}
    >
      {/* <img src={ellipseBig} alt="" className="auth--ellipsebig" /> */}
      <svg
        width="329"
        height="914"
        viewBox="0 0 329 914"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="auth--ellipsebig"
      >
        <g>
          <circle cx="-128" cy="457" r="457" fill="#fbda03" />
        </g>
      </svg>

      {/* <img src={subtract} alt="" className="auth--subtract" /> */}
      <svg
        width="451"
        height="352"
        viewBox="0 0 451 352"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="auth--subtract"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.74592 -240.125C6.45309 -275.276 13.6302 -310.131 24.2774 -344.134L374.866 -694.723C408.869 -705.37 443.724 -712.547 478.875 -716.254L2.74592 -240.125ZM167.745 205.888C182.089 219.441 196.998 232.05 212.394 243.717L962.717 -506.606C951.05 -522.002 938.441 -536.911 924.888 -551.255L167.745 205.888ZM321.784 307.7C303.114 299.59 284.812 290.366 266.979 280.027L999.027 -452.021C1009.37 -434.188 1018.59 -415.886 1026.7 -397.216L321.784 307.7ZM388.76 331.618C411.114 337.958 433.8 342.816 456.662 346.194L1065.19 -262.338C1061.82 -285.2 1056.96 -307.886 1050.62 -330.24L388.76 331.618ZM633.215 343.015C603.014 348.597 572.427 351.572 541.814 351.937L1070.94 -177.186C1070.57 -146.573 1067.6 -115.986 1062.01 -85.7854L633.215 343.015ZM768.272 298.852C820.978 273.408 870.379 238.825 914.102 195.102C957.825 151.379 992.408 101.978 1017.85 49.2719L768.272 298.852ZM878.045 -595.306L123.694 159.045C110.977 143.803 99.239 128.021 88.4798 111.781L830.781 -630.52C847.021 -619.761 862.803 -608.023 878.045 -595.306ZM55.2624 54.104L773.104 -663.738C754.193 -673.104 734.844 -681.285 715.167 -688.279L30.7207 -3.83258C37.7155 15.8438 45.8961 35.193 55.2624 54.104ZM10.8703 -74.8765C5.92033 -98.863 2.62668 -123.123 0.989391 -147.474L571.526 -718.011C595.877 -716.373 620.137 -713.08 644.124 -708.13L10.8703 -74.8765Z"
          fill="#fbda03"
        />
      </svg>

      {/* <img src={polygon1} alt="" className="auth--  polygon1" /> */}
      {/* <img src={polygon2} alt="" className="auth--polygon2" /> */}
      <svg
        width="255"
        height="221"
        viewBox="0 0 255 221"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="auth--polygon2"
      >
        <path
          d="M0.502171 0.606115L281.05 79.3626L72.571 282.946L0.502171 0.606115Z"
          fillOpacity="0.5"
        />
      </svg>
      {/* <img src={polygon3} alt="" className="auth--polygon3" /> */}
      <svg
        width="146"
        height="128"
        viewBox="0 0 146 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="auth--polygon3"
      >
        <path
          d="M0.602513 0.431554L281.15 79.1881L72.6713 282.771L0.602513 0.431554Z"
          fill="#fbda03"
          fillOpacity="0.5"
        />
      </svg>

      <div
        className={`auth--container ${
          signIn && windowSize.innerWidth <= 480
            ? "auth--container--mobile"
            : ""
        }`}
      >
        <img
          src={require("../images/auth/closeicon.png")}
          alt=""
          className="auth--close--btn"
          onClick={handleClose}
        />
        <div className="auth--heading">
          {signIn === false ? `Login` : `Sign Up`}
        </div>
        <div className="auth--container--sub">
          {signIn && (
            <input
              type="text"
              className="auth--username"
              placeholder="Enter full name"
              name="username"
              value={formData.username}
              onChange={handleForm}
            />
          )}
          <input
            type="text"
            className="auth--username"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleForm}
          />
          <input
            type="text"
            className="auth--password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleForm}
          />
          {signIn && (
            <input
              type="text"
              className="auth--password"
              placeholder="Confirm Password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleForm}
            />
          )}
          <button className="auth--submit" onClick={handleSubmit}>
            Login
          </button>
          <div className="auth--mode" onClick={handleMode}>
            {signIn === false
              ? `Create account`
              : `Already have an account? Login`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
