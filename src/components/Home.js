import React from 'react'
import Loginform from './Loginform'
import Printmenu from './Printmenu'
import {Link} from 'react-router-dom'
import axios from 'axios'
import aps from '../services/axios.js'
import { useState ,useEffect} from 'react'
import './Header.css'

const Home = () => {
    const [use, setUse] = useState('')
    // const func = ()=>{
    //     aps.pritamFuncMe()
    //     .then(res=>{            

    //         setUse(res.data.user)
    //         console.log('localStorage',localStorage.getItem('userId'))
    //     })
    // }
    // useEffect(() => {
    //     func()
    //     console.log('use = ',use)
    // }, [])
    // console.log('use = ',use)
    
    axios.get('http://localhost:5000/users/me',{
        headers: {
            'Authorization': localStorage.getItem('token')
          }
    })
    .then(res => {
        console.log('present user exists');
        // console.log(res.data) ;
        setUse(res.data._id);
        // console.log('res = ',res.data)
        console.log('here is out user id',use)
        // console.log(use)
    })
    .catch(error => {
        console.log('no one logged in')
    })

    // console.log('local',localStorage.getItem('userId'))
    const RenderMenu = () => {
        if(use==''){
            return(
                <div>Login first</div>
            )
        }
        else{
        return(
            <div>
                <span id = 'add-new-template'><Link to = '/titleform'  state = {{id:use}}> add new template</Link></span>
                <p id = 'saved-header'>Your saved templates:</p>

                <Printmenu userId={use}/> 
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
