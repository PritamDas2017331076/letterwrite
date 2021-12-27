import React, { Fragment } from "react";
import "./index.css"
import Tp from './components/Tp.js'
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import Teditor from './components/Teditor.js'
const App  = ()=>{
  return (
    <div>
    <Teditor/>
      {/* <Router>
        <Header/>
        <Routes>
          <Route path = "/Tp" str="fdadf" element={<Tp/>}/>
        </Routes>
        
      </Router> */}
    </div>
  )
}

export default App