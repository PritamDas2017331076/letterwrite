import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Signupform from './Signupform'
import { useState } from 'react'
import './Header.css'
const Header = () => {

    const [use, setUse] = useState('')
    
    // axios.get('http://localhost:5000/users/me',{
    //     headers: {
    //         'Authorization': localStorage.getItem('token')
    //       }
    // })
    // .then(res => {
    //     console.log('present user exists');
    //     console.log(res.data) ;
    //     setUse(res.data._id);
    //     localStorage.setItem('pre', use);
    //     console.log('here is out user id')
    //     console.log(use)
    // })
    // .catch(error => {
    //     console.log('no one logged in')
    // })
    
    const logoutClick = ()=>{
        axios.get('http://localhost:5000/users/logout', {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          })
        .then(
            res => {
                localStorage.setItem('token', '1a');
                localStorage.setItem('state','')
                console.log(res.data)
                window.location.href = "/";
            }
         ) 
         .catch(err =>{
             console.log(err)
         })
    }
    
    const RenderMenu = () => {
      
        if(use==''){
            return(
                <nav >
                <div>
                </div>
                    <div className = 'nav-list'>
                        <span><Link to='/'>Home</Link></span>
                        {/* <span><Link to={{pathname:'/Tp',state:{var:"value"}}}>Tp</Link></span> */}
                        <span><Link to='/signup'>Signup</Link></span>
                    </div>
                
                </nav>
                 )
        }
        else{
            return(
                <nav >
                <div>
                </div>
                    <div className = 'nav-list'>
                        <span><Link to='/'>Home</Link></span>
                        {/* <span><Link to={{pathname:'/Tp',state:{var:"value"}}}>Tp</Link></span> */}
                        <span onClick={logoutClick}>Logout</span>
                    </div>
                
                </nav>
                 )
        }
   }

    return (
        <div>
            <RenderMenu/>
        </div>
    )
}

export default Header
