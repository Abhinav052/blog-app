import React from "react";
import upvoteIcon from "../images/card/upvoteIcon.svg";
import viewsIcon from "../images/card/views-3.svg";
import downvoteIcon from "../images/card/downvoteIcon.svg";
import { useNavigate } from "react-router-dom";
const Cards = (props) => {
  const navigate = useNavigate();
  function handleDetails() {
    if (!props !== true) {
      console.log(props);
      props.setLoader(true);
      console.log("Altering loader 2");
    }
    navigate(`/details/${props.pid}`);
  }
  return (
    <div className="card--container" onClick={!props ? "" : handleDetails}>
      <img src={!props ? "" : props.image} alt="" className="card--image" />
      <div className="card--content">
        <div className="card--header">
          <span>{!props ? "" : props.category} </span>
          <div>{!props ? "" : props.title.slice(0, 60) + " . . ."}</div>
        </div>
        <div className="card--main">
          {!props ? "" : props.desc.slice(0, 180) + " . . ."}
        </div>
        <div className="card--footer">
          <div className="card--author">{`Published By - ${
            !props ? "" : props.user
          }`}</div>
          <div className="card--votes">
            <div>
              <img src={upvoteIcon} alt="" />
              <span>10</span>
            </div>
            <div>
              <img src={downvoteIcon} alt="" />
              <span>2</span>
            </div>
            <div>
              <img src={viewsIcon} alt="" />
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
