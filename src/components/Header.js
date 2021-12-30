import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Signupform from './Signupform'
import { useState ,useEffect} from 'react'
import './Header.css'
const Header = () => {

    const [use, setUse] = useState("")
    // axios.get('http://localhost:5000/users/me',{
    //     headers: {
    //         'Authorization': localStorage.getItem('token')
    //       }
    // })
    // .then(res => {
    //     // console.log('present user exists');
    //     // console.log(res.data) ;
    //     setUse(res.data.user);
    //     // console.log(use)
    // })
    // .catch(error => {
    //     console.log('no one logged in')
    // })

    console.log('local data header ',localStorage.getItem('userId'))
    
    useEffect(() => {
        setUse(localStorage.getItem('userId'))
        console.log('use header = ',use)
    }, [])
    
    const logoutClick = ()=>{
        axios.get('http://localhost:5000/users/logout', {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          })
        .then(
            res => {
                 localStorage.setItem('token', '1a');
                 localStorage.setItem('userId','')
               // localStorage.clear()
                console.log('Here is previous user')
                console.log(res.data)
                window.location.href = "/login";
            }
         ) 
         .catch(err =>{
            localStorage.setItem('token', '1a');
            localStorage.setItem('userId','')
             console.log('logout error :',err)
         })
    }
    // console.log('local at header = ',localStorage.getItem('userId'))
    if(!localStorage.getItem('userId'))
        console.log('locals true')
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

                        <span><Link to ='/login' >Login</Link></span>
                        {/* <span><Link to = '/login' state={{ from: 'occupation' }}>login</Link></span> */}
                    </div>
                
                </nav>
                 )
        }
        else{
            return(
                <nav >
                    <div className = 'nav-list'>
                        <span><Link to='/'>Home</Link></span>
                        <span><Link to='/signup'>Signup</Link></span>
                        <span onClick={logoutClick} id = 'logout'>Logout</span>
                        {/* <span><Link to={{pathname:'/Tp',state:{var:"value"}}}>Tp</Link></span> */}
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
