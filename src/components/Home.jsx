import React from "react";
import Cards from "./Cards";
import searchicon from "../images/home/searchicon.svg";
import Sidemenu from "./Sidemenu";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";
// import img1 from "../images/carousel/img1.jpg";
import Details from "./Details";
import Loader from "./Loader";
const Home = ({ homeProps: { postData, loader, setLoader } }) => {
  console.log("Home rendered");
  // const image =
  //   URL.createObjectURL()
  // Implement nav hide on focus on home
  // const image = "";
  const [popular, setPopular] = React.useState("");
  const [cards, setCards] = React.useState("");
  const [load, setLoad] = React.useState(0);
  React.useEffect(() => {
    if (postData !== "") {
      console.log("popular created");

      const popular = postData.data.slice(0, 6).map((data) => {
        return <Sidemenu title={data.title} image={data.img} />;
      });
      setPopular(popular);
      const card = postData.data.map((data) => {
        return (
          // <Link
          //   to={`/details/${data.pid}`}
          //   target="_blank"
          //   style={{ textDecoration: "none" }}
          // >
          <Cards
            title={data.title}
            image={data.img}
            desc={data.blog}
            category={data.category}
            user={data.username}
            pid={data.pid}
            setLoader={setLoader}
          />
          // </Link>
        );
      });
      if (card.length >= 6) {
        setLoad(6);
      } else {
        setLoad(card.length);
      }

      setCards(card);
    }
  }, [postData]);

  console.log("Post data from home" + postData);
  console.log(postData);
  const [carouselData, setCarouselData] = React.useState("");
  React.useEffect(() => {
    let tempData = postData.data;
    let res = "";
    if (postData !== "") {
      res = tempData.map((dataItem) => {
        let { img, pid } = dataItem;
        return { img, pid };
      });
    }
    setCarouselData(res);
    setLoader(false);
  }, [postData]);
  function handleLoad() {
    if (load + 6 > cards.length) {
      setLoad(cards.length);
    } else {
      setLoad((prev) => prev + 6);
    }
  }
  return loader ? (
    <Loader />
  ) : (
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
            {popular}
          </div>
          {/* <div className="home--new">
            <div className="home--new--heading">New</div>
            <Sidemenu />
            <Sidemenu />
            <Sidemenu />
            <Sidemenu />
            <Sidemenu />
          </div> */}
          <div className="home--recent">
            <div className="home--recent--heading">Recent</div>
            {!popular
              ? ""
              : popular.sort((a, b) => 0.5 - Math.random()).slice(0, 6)}
          </div>
        </div>
        <div className="home--section1--2">
          <div className="home--carousel">
            {carouselData === "" ? (
              ""
            ) : (
              <Carousel image={[carouselData, setLoader]} />
            )}
          </div>
          <div className="home--cards">{cards.slice(0, load)}</div>
          <div className="home--loadmore">
            <button
              onClick={handleLoad}
              disabled={load === cards.length ? true : false}
            >
              Load More...
            </button>
          </div>
        </div>
      </div>

      {/* Home
      <img src={image} alt="" /> */}
    </div>
  );
};

export default Home;
