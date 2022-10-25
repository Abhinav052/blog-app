import React from "react";
import createdefault from "../images/create/createdefault.jpg";
// import createdefaultedit from "../images/create/createdefaultedit.jpg";
const Create = (props) => {
  // createdefault = createdefaultedit;

  //Props DEsctructuring
  const {
    createProps: { username, status, email },
  } = props;

  const [createData, setCreateData] = React.useState({
    username: username,
    status: status,
    img: "",
    title: "",
    category: "",
    blog: "",
    tags: [],
    email: email,
  });
  console.log("username== " + username + status);
  // console.log(props.createProps);

  function handleChange(event) {
    event.preventDefault();
    try {
      setCreateData((prevData) => {
        return {
          ...prevData,
          [event.target.name]: event.target.value,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
  console.log(createData);

  const [activeImg, setActiveImg] = React.useState(null);
  const [previewImg, setPreviewImg] = React.useState(null);
  function handleImageChange(event) {
    event.preventDefault();
    if (event.target.files[0]) {
      setActiveImg(event.target.files[0]);
    }
  }
  React.useEffect(() => {
    if (activeImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(activeImg);
    } else {
      setPreviewImg(null);
    }
  }, [activeImg]);

  React.useEffect(() => {
    setCreateData((prevData) => {
      return {
        ...prevData,
        img: previewImg,
      };
    });
  }, [previewImg]);

  // console.log(previewImg + "PrevieImg");
  // console.log("active IMG = " + activeImg);
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
              accept="image/*"
            />
            {previewImg ? (
              <img
                src={previewImg}
                alt=""
                className="create--imageloader--default"
              />
            ) : (
              <img
                src={createdefault}
                alt=""
                className="create--imageloader--default"
              />
            )}
          </label>
          {/* </div> */}
        </div>
        <div className="create--container">
          <form className="create--form">
            {/*  TITLE INPUT */}
            <div className="create--forminput">
              <label htmlFor="create--title">Title</label>
              <input
                type="text"
                id="create--title"
                placeholder="Enter Title"
                name="title"
                value={createData.title}
                onChange={handleChange}
              />
            </div>
            {/*  CATEGORY SECTION */}
            <div className="create--forminput">
              <label htmlFor="create--category"> Category</label>
              <select
                id="create--category"
                name="category"
                value={createData.value}
                onChange={handleChange}
              >
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
              <input type="text" id="create--tags" name="tags" value={createData.value} />
            </div> */}

            {/* TEXY AREA */}
            <div className="create--forminput">
              <label htmlFor="create--textarea"></label>
              <textarea
                name="blog"
                value={createData.value}
                onChange={handleChange}
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
