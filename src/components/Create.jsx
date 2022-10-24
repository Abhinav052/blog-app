import React from "react";
import createdefault from "../images/create/createdefault.jpg";
// import createdefaultedit from "../images/create/createdefaultedit.jpg";
const Create = () => {
  // createdefault = createdefaultedit;
  const [activeImg, setActiveImg] = React.useState(null);
  const handleImageChange = (event) => {
    event.preventDefault();
    setActiveImg(event.target.files[0]);
    console.log("active IMG =" + activeImg);
    console.log(event.target.files[0]);
  };
  return (
    <div
      style={{
        // backgroundColor: "orange",
        // height: "100vh",
        width: "100%",
        position: "absolute",
        top: "10vh",
        background: "rgb(48, 25, 52)",
      }}
    >
      <div className="create--supercontainer">
        <div className="create--imageloader">
          {/*  IMAGE */}
          {/* <div className="create--forminput"> */}
          <label htmlFor="create--image">
            <input
              type="file"
              name=""
              id="create--image"
              onChange={handleImageChange}
            />
            <img
              src={!activeImg ? createdefault : activeImg}
              alt=""
              className="create--imageloader--default"
            />
          </label>
          {/* </div> */}
        </div>

        <div className="create--container">
          <form className="create--form">
            {/*  TITLE INPUT */}
            <div className="create--forminput">
              <label htmlFor="create--title">Title</label>
              <input type="text" id="create--title" />
            </div>
            {/*  CATEGORY SECTION */}
            <div className="create--forminput">
              <label htmlFor="create--category"> Category</label>
              <select id="create--category">
                <option value="">-- Choose --</option>
                <option value="technology">Technology</option>
                <option value="gaming">Gaming</option>
                <option value="sports">Sports</option>
                <option value="food">Food</option>
              </select>
            </div>
            {/* TAGS */}
            {/* <div className="create--forminput">
              <label htmlFor="create--tags">Tags</label>
              <input type="text" id="create--tags" />
            </div> */}

            {/* TEXY AREA */}
            <div className="create--forminput">
              <label htmlFor="create--textarea"></label>
              <textarea
                name=""
                id="create--textarea"
                cols="30"
                rows="10"
              />{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
