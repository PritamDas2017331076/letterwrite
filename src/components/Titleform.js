import React,{useState} from 'react'
import axios from '../services/axios.js';
const Titleform = () => {
    const [title,setTitle]=useState('')
    const onSubmit = (e) => {
        e.preventDefault()
        if(!title){
            alert('Please enter title')
            return
        }
        /* onAdd({user,email,password,passwordr}) */
        const templateDetails = {
            userId: localStorage.getItem('pre'),
            data:'',
            name:title
          }
          const data = axios.addTemplate(templateDetails)
          console.log('success!');        
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
