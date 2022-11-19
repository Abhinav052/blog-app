import React from "react";
import img1 from "../images/carousel/img1.jpg";
import { useNavigate } from "react-router-dom";
// import img2 from "../images/carousel/img2.jpg";
// import img3 from "../images/carousel/img3.jpg";
// import img4 from "../images/carousel/img4.jpg";

const Carousel = ({ image }) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = React.useState({ img: img1 });
  React.useState(() => {
    let i = 0;
    let interval;
    if (!image !== true) {
      interval = setInterval(() => {
        i++;
        setActiveImage(image[0][i % image.length]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [image]);

  function handleRedirect(pid) {
    image[1]?.(true);
    console.log(pid);
    navigate(`/details/${pid}`);
  }
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <img
        src={activeImage?.img}
        alt=""
        style={{ height: "100%", width: "100%" }}
        onClick={() => {
          handleRedirect(activeImage?.pid);
        }}
      />
    </div>
  );
};

export default Carousel;
