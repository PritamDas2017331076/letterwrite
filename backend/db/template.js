import mongoose from 'mongoose'

const Schema = mongoose.Schema

const templateSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    data:{
        type:String,
    },
    name:{
        type:String,
    }
})

const templateModel = mongoose.model('template',templateSchema)
export default templateModel