import React from "react";

const Sidemenu = (props) => {
  return (
    <div className="sidemenu--container">
      <div className="sidemenu--image">
        <img src={!props ? "" : props.image} alt="" />
      </div>
      <div className="sidemenu--title">
        {!props ? "" : props.title.slice(0, 40) + ". . ."}
      </div>
    </div>
  );
};

export default Sidemenu;
