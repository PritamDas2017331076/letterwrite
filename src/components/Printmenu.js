import React,{useState, useEffect} from 'react'
import aps from '../services/axios.js';
import axios from 'axios'
import Recordlayout from './Recordlayout'
import './Printmenu.css'
import { useLocation } from 'react-router-dom';
const Printmenu = (props) => {
    const [items,setItems] = useState([])
    console.log('props = ',props)
    console.log('user  = ',props.userId)
    const [use, setUse] = useState(props.userId)
    // const location = useLocation()
    // const curState = location.state
    // console.log('curState = ',curState)
    const loadData = async ()=>{
        const res = await aps.getTemplateUser(use)
        console.log('use = ',use)
        console.log('loaded data = ',res)
        return res.data
    }

    useEffect(() => {
        loadData()
        .then((res)=>{
            // console.log('load data success',res)
            setItems(res)
        })
    },[]) 
    return (
        <div className = 'template-items-wrapper'>
            <div className = 'template-items'>                
            {
                items.map(item => (            
                    <div key={item._id}>
                        <Recordlayout dataid={item._id} userid={item.userId} data={item.data} name = {item.name}/>
                    </div>
                ))
            }   
        </div>
       </div>
    )
}

export default Printmenu
