import {useState} from 'react'

const Tp = (props)=>{
    const [val,setVal] = useState("daf")
    console.log('props = ',props)
    return (
        <div>
            <p>Hello world {val}</p>
        </div>
    )
}

export default Tp