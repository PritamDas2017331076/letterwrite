import React from 'react'
import Loginform from './Loginform'
import Printmenu from './Printmenu'
import {Link} from 'react-router-dom'
import axios from 'axios'
import aps from '../services/axios.js'
import { useState ,useEffect} from 'react'
import './Header.css'

const Home = () => {
    const [use, setUse] = useState()
    const func = ()=>{
        aps.pritamFuncMe()
        .then(res=>{
            console.log('home res = ',res.data)
            // setUse(res.data._id)
            localStorage.setItem('userId',use)
            setUse(res.data._id)
        })
    }
    useEffect(() => {
        func()
    }, [])
    console.log('use = ',use)
    
    // axios.get('http://localhost:5000/users/me',{
    //     headers: {
    //         'Authorization': localStorage.getItem('token')
    //       }
    // })
    // .then(res => {
    //     console.log('present user exists');
    //     console.log(res.data) ;
    //     setUse(res.data._id);
    //     console.log('here is out user id')
    //     console.log(use)
    // })
    // .catch(error => {
    //     console.log('no one logged in')
    // })
    const RenderMenu = () => {
        if(use==''){
            return(
                <div >
                
                    <div>
                        <Loginform/>
                    </div>
                
                </div>
            )
        }
        else{
            return(
                <div>
                    <span><Link to={{
                     pathname: '/titleform',            
                    }} >add template</Link></span>
                    <Printmenu/> 
                </div>
            )
        }

    }
    return (
        <div>
            <RenderMenu/>
        </div>
    )
}

export default Home
