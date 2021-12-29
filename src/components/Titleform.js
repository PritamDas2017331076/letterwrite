import React,{useState} from 'react'
import axios from '../services/axios.js';
import {useLocation} from 'react-router-dom'
const Titleform = () => {
    const location = useLocation()
    const cur = location.state
    // console.log('cur state = ',cur)
    const [title,setTitle]=useState('')
    const addTemplate = async (obj)=>{
        const res = await axios.checkName(obj.name)
        console.log('res = ',res.data)
        if(!res.data){
            const data = await axios.addTemplate(obj)
            console.log('unique!')
            console.log('added template data',data)
            window.location.href = '/home'
        }
        else{
            alert('name exists')
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        if(!title){
            alert('Please enter title')
            return
        }
        /* onAdd({user,email,password,passwordr}) */
        const templateDetails = {
            userId: cur.id,
            data:'',
            name:title
          }
          console.log('templateDetails = ',templateDetails)
          await addTemplate(templateDetails)
    }
    return (
        <div>
            <div className = 'form-wrapper'>
            <p className = 'login-header'>Title Form</p>
            <form  className = 'form' onSubmit={onSubmit} >

                <div>
                <input
                   type='text'
                   placeholder='Enter Title'
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                />
                </div>
                
                <button type='submit' value='login'>Submit</button>
            </form>
        </div>
        </div>
    )
}

export default Titleform
