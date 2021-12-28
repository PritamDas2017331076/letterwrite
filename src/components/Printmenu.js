import React,{useState, useEffect} from 'react'
import aps from '../services/axios.js';
import axios from 'axios'
import Recordlayout from './Recordlayout'

const Printmenu = () => {
    const [items,setItems] = useState([])
    const [use, setUse] = useState('')
    axios.get('http://localhost:5000/users/me',{
        headers: {
            'Authorization': localStorage.getItem('token')
          }
        })
        .then(res => {
            console.log('present USER exists');
            console.log(res.data) ;
            setUse(res.data._id);
            console.log(use)
        })
        .catch(error => {
            console.log('no one logged in')
        })

    useEffect(() => {

      
       

        axios.get(`http://localhost:5000/api/letter-template/templates`)
        .then(res => {
            console.log('GOT THE WHOLE LIST OF DATA')
            console.log(res.data) 
            setItems(res.data)
            console.log('LETS SEE FILTERED DATA');
            console.log(items)
       }) ;
    },[]) 
    return (
        <div>
        <div>
                
                {
                   items.map(item => (
                      
                        <div key={item._id}>
                       
                        <Recordlayout dataid={item._id} userid={item.userId} name={item.name} data={item.data} />
                        </div>
                       
                   ))
                }
                
       </div>
       </div>
    )
}

export default Printmenu
