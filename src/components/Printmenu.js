import React,{useState, useEffect} from 'react'
import aps from '../services/axios.js';
import axios from 'axios'
import Recordlayout from './Recordlayout'
import './Printmenu.css'
const Printmenu = () => {
    const [items,setItems] = useState([])
    const [use, setUse] = useState(localStorage.getItem('userId'))

    console.log('user  = ',use)
    const loadData = async ()=>{
        const res = await aps.getTemplates()
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
