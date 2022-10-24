import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import Auth from './components/Auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Create from './components/Create'
const App = () => {
  const [windowSize, setWindowSize] = React.useState(getWindowSize());
  const [activeUser, setActiveUser] = React.useState({ username: "", userSignedIn: false });


  //Code for persisting state on reload               //IMP


  // setActiveUser({ username: "gigachad", userSignedIn: true })
  React.useEffect(() => {
    setUser();
  }, [])
  // const [activeUser, setActiveUser] = React.useState(setUser());
  // console.log(!JSON.parse(localStorage.getItem("data")))
  // console.log(JSON.parse(localStorage.getItem("data"))?.username)
  function setUser() {
    if (!JSON.parse(localStorage.getItem("data")))
      setActiveUser({ username: "", userSignedIn: false })
    else
      setActiveUser({ username: JSON.parse(localStorage.getItem("data"))?.username, userSignedIn: true })

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar navProps={navProps} />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<Cart />} />
          <Route path='/create' element={<Create />} />
        </Route>
        <Route path='/auth' element={<Auth authProps={authProps} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App