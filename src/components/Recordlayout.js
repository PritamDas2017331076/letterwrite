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
    }
    return (
        <div>

            <div className="item" onClick = {handleClick}>
                <div>{name}</div>
            </div>
            <button onClick = {deleteTemplate}>delete</button>
        </div>
    )
}

export default Recordlayout
