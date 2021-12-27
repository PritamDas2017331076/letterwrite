import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import './Header.css'
const Header = () => {
    
    const RenderMenu = () => {
      
        return(
           <nav >
           <div>
           </div>
               <div className = 'nav-list'>
                   <span><Link to='/'>Home</Link></span>
                   <span><Link to={{pathname:'/Tp',state:{var:"value"}}}>Tp</Link></span>
               </div>
           
           </nav>
            )
   }

    return (
        <div>
            <RenderMenu/>
        </div>
    )
}

export default Header
