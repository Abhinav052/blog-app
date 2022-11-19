// import React from "react";
// import Comment from "./Comment";
// import { useParams } from "react-router-dom";
// const Details = ({ detailProps: { postData } }) => {
//   let id = useParams();

//   const [currentPost, setCurrentPost] = React.useState("");
//   React.useEffect(() => {
//     // if (!postData === false) {
//     //   setCurrentPost(
//     //     postData.data.filter((data) => {
//     //       if (data.pid === id.pid) return data;
//     //     })
//     //   );
//     // }
//   }, []);
//   console.log(currentPost);
//   return (
//     <div
//       style={{
//         height: "100vh",
//         width: "100%",
//         position: "absolute",
//         top: "10vh",
//       }}
//     >
//       <h1 className="details--title"></h1>
//       <img src="" alt="" className="details--image" />
//       <p className="details--content"></p>
//       <div className="details--publisher"></div>
//       <Comment />
//     </div>
//   );
// };

// export default Details;
import React from "react";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
const Details = (props) => {
  let id = useParams();
  const [data, setData] = React.useState("");
  const [currentPost, setCurrentPost] = React.useState([""]);
  React.useEffect(() => {
    setData(props?.homeProps?.postData?.data);
  }, []);
  React.useEffect(() => {
    if (!data === false) {
      setCurrentPost(
        data.filter((data) => {
          if (data.pid === id.pid) return data;
        })
      );
    }
  }, [data]);
  console.log(currentPost[0]);
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "absolute",
        top: "10vh",
      }}
    >
      <div
        style={{
          height: "100vh",
          width: "100%",
          position: "absolute",
          top: "10vh",
        }}
      >
        <h1 className="details--title"></h1>
        <img src="" alt="" className="details--image" />
        <p className="details--content"></p>
        <div className="details--publisher"></div>
        <Comment />
      </div>
    </div>
  );
};

export default Details;
