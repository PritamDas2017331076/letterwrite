import React from 'react'
import { useState, useContext } from 'react'
import axios from 'axios'
import './Loginform.css'
import { useLocation } from 'react-router-dom'
const Loginform = () => {
    const [user, setUser] = useState('')
    const [password, setPass] = useState('')
    const location = useLocation()
	const cur = location.state
	
    console.log('cur = ',cur)
    const onSubmit = (e) => {
        e.preventDefault()

        if(!user){
            alert('Please enter user')
            return
        }

        if(!password){
            alert('Please enter password')
            return
        }
        /* onAdd({user,email,password,passwordr}) */

        const userDetails = {
            user: user,
            password: password
          }

        axios.post('http://localhost:5000/users/login',userDetails)
          .then(
              res => {
                  console.log('data in login form ',res.data)
                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem('userId',res.data.userr._id)
                //   console.log('login-> data = ',res.data)
                 // console.log()
                  console.log('after login data',res.data)
                  console.log('local storage loginform ',localStorage.getItem('userId'))
                  window.location.href='/'
              }
           ) 
           .catch(err =>{
               console.log(err)
           })

        setUser('')
        setPass('')

        
    }
    return (
        <div className = 'form-login'>
        <p className = 'form-header'>Login Form</p>
        <div className = 'form-wrapper'>
            <form  className = 'form' onSubmit={onSubmit}>

                <div>
                <input
                   type='text'
                   placeholder='Enter Username'
                   value={user}
                   onChange={(e) => setUser(e.target.value)}
                />
                </div>
                <div >
                <input
                   type='password'
                   placeholder='Enter Password'
                   value={password}
                   onChange={(e) => setPass(e.target.value)}
                />
                </div>  
                <button type='submit' value='login'>Login</button>
            </form>
        </div>
        </div>
    )
}

export default Loginform
