import React, { Fragment } from "react";
import "./index.css"
import Tp from './components/Tp.js'
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import Teditor from './components/Teditor.js'
import Signupform from './components/Signupform'
import Home from './components/Home'
import Titleform from './components/Titleform'
const App  = ()=>{
  return (
    // <div>
    // {/* <Teditor/> */}
    //   {/* <Router>
    //     <Header/>
    //     <Routes>
    //       <Route path = "/Tp" str="fdadf" element={<Tp/>}/>
    //     </Routes>
        
    //   </Router> */}
    // </div>
    <div className="App">
    <Router>
      <Header/>
      <Routes>
      
        <Route
          exact
          path="/" element={<Home/>} 
        />

        <Route
          path="/home" element={<Home/>} 
        />

        <Route
          path="/editor" element={<Teditor/>} 
        />

        <Route
          path="/signup" element={<Signupform/>} 
        />
        <Route
          path="/titleform" element={<Titleform/>} 
        />
        </Routes>
    </Router>
    </div>
  )
}

export default App