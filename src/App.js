import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import Auth from './components/Auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Create from './components/Create'
import setInterceptorHeader from './axios/postinterceptor'
import Details from './components/Details'
const App = () => {
  const [windowSize, setWindowSize] = React.useState(getWindowSize());
  const [activeUser, setActiveUser] = React.useState({ username: JSON.parse(localStorage.getItem("data"))?.username, userSignedIn: JSON.parse(localStorage.getItem("data"))?.username ? true : false, email: JSON.parse(localStorage.getItem("data"))?.email });
  //Code for persisting state on reload               //IMP



  //Accessing all posts from server
  const [postData, setPostData] = React.useState("");
  async function fetchAllPosts() {
    try {
      const res = await setInterceptorHeader.get("/fetch");
      setPostData(res.data);
    } catch (error) {
      console.log(error);
      // alert("Please reload Page")
    }
  }
  React.useEffect(() => {
    fetchAllPosts();
  }, [])

  // console.log(postData)

  // setActiveUser({ username: "gigachad", userSignedIn: true })
  React.useEffect(() => {
    setUser();
  }, [activeUser.userSignedIn])
  // const [activeUser, setActiveUser] = React.useState(setUser());
  // console.log(!JSON.parse(localStorage.getItem("data")))
  // console.log(JSON.parse(localStorage.getItem("data"))?.username)
  function setUser() {
    if (!JSON.parse(localStorage.getItem("data")))
      setActiveUser({ username: "", userSignedIn: false })
    else
      setActiveUser({ username: JSON.parse(localStorage.getItem("data"))?.username, userSignedIn: true, email: JSON.parse(localStorage.getItem("data"))?.email })

  }

  //Finding window size and cleanup on window close

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }


  //PROP OBJECTS FOR DIFFERENT COMPONENTS


  const authProps = {
    windowSize: windowSize,
    setActiveUser: setActiveUser
  }

  const navProps = {
    windowSize: windowSize,
    activeUser: activeUser
  }

  const createProps = {
    username: activeUser.username,
    status: activeUser.userSignedIn,
    email: activeUser.email

  }

  const homeProps = {
    postData: postData
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar navProps={navProps} />}>
          <Route index element={<Home homeProps={homeProps} />} />
          <Route path='/about' element={<Cart />} />
          <Route path='/create' element={<Create createProps={createProps} />} />
          <Route path='/details/:pid' element={<Details homeProps={homeProps} />} />
        </Route>
        <Route path='/auth' element={<Auth authProps={authProps} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App