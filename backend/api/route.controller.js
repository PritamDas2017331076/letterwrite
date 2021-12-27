import userModel from "../db/user.js";
import templateModel from "../db/template.js";
export default class RouteCtrl{

    ///user part

    static async apiAddUser(req,res){
        const user = req.body
        console.log('body',req.body)
        
        const newUser = new userModel(user)
        console.log('user = ',newUser)
        ///handle duplicate user later
        await newUser.save((err,data)=>{
            if(err)
            {
                console.log('user save error')
                res.send("user add failed")
                return    
            }
            console.log('save success!',data)
            res.send(data)
        })
    }

    static async apiGetUser(req,res){
        console.log('get user data request: ',req.query)
        userModel.find({})
        .then((data)=>{
            console.log('after find data:',data)
            res.send(data)
        })
    }

    static async apiGetOneUser(req,res){
        console.log('req param ',req.params.id)
        userModel.find({_id:req.params.id})
        .then((data)=>{
            res.send(data)
        })
    }
    ///templates part
    static async apiGetTemplates(req,res){
        templateModel.find({})
        .then((data)=>{
            res.send(data)
        })
    }
    static async apiAddTemplate(req,res){
        const newTemplate = new templateModel(req.body)
        await newTemplate.save((err,data)=>{
            if(err){
                console.log(`template save failed ${err}`)
                console.log('body = ',req.body)
                return
            }
            console.log('template save success! ',data)
            res.send(data)
        })
    }
}
