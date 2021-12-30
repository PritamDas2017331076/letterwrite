import React from 'react'
import './RecordLayout.css'
import {useNavigate} from "react-router-dom"
import axios from '../services/axios.js'
import {useState} from 'react'
const Recordlayout = ({dataid,userid,data,name}) => {
    const navigate = useNavigate()
    const handleClick = (e)=>{
        e.preventDefault()
        const obj = {
            templateId:dataid,
            userId:userid,
            data:data
        }
        navigate('/editor',{state:obj})
        console.log('obj = ',obj)
    }
    
    const deleteTemplate = async (e)=>{
        e.preventDefault()
        await axios.deleteTemplate(dataid)
        window.location.href = '/home'
        console.log('delete after')
    }
    return (
        <div>
            <div className="item" >
                <p className = 'template-name'>{name}</p>
            <button onClick = {deleteTemplate} id = 'bt-delete'>delete</button>
            <button onClick = {handleClick} id = 'bt-edit'>edit</button>
            </div>
        </div>
    )
}

export default Recordlayout
