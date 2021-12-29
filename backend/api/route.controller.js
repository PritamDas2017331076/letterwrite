import User from "../db/user.js";
import templateModel from "../db/template.js";
export default class RouteCtrl {

    ///user part

    static async apiAddUser(req, res) {

        console.log('body', req.body)
        const user = req.body.user;
        const email = req.body.email;
        const password = req.body.password;

        const newUser = new User({ user, email, password })
        console.log('user = ', newUser)
            ///handle duplicate user later
        await newUser.save((err, data) => {
            if (err) {
                console.log('user save error')
                res.send("user add failed ", err)
                return
            }
            console.log('save success!', data)
            res.send(data)
        })
    }

    static async apiUserLogin(req, res) {
        const user = req.body
        console.log('body', req.body)

        try {
            console.log(req.body.user)
            console.log(req.body.password)
            const userr = await User.findByCredentials(req.body.user, req.body.password)
            const token = await userr.generateAuthToken()
            res.status(200).send({ userr, token })
        } catch (e) {
            res.status(400).json(e)
        }

    }

    static async apiUserLogout(req, res) {
        try {
            req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
                //  req.user.tokens = []
            await req.user.save();
            res.status(200).send(req.user)
        } catch (e) {
            res.status(500).send()
        }

    }

    static async apiGetCurrentUser(req, res) {
        try {
            res.status(200).send(req.user)
        } catch (e) {
            res.status(500).send()
        }
    }

    static async apiGetUser(req, res) {
        console.log('I am here')
        console.log('get user data request: ', req.query)
        User.find({})
            .then((data) => {
                console.log('after find data:', data)
                res.send(data)
            })
            .catch(err => res.status(400).json('Error: ' + err));
        // User.find()
        //     .then(users => res.json(users))
        //     .catch(err => res.status(400).json('Error: ' + err));
    }

    static async apiGetOneUser(req, res) {
            console.log('req param ', req.params.id)
            User.find({ _id: req.params.id })
                .then((data) => {
                    res.send(data)
                })
        }
        ///templates part
    static async apiGetTemplates(req, res) {
        templateModel.find({})
            .then((data) => {
                res.send(data)
            })
    }
    static async apiAddTemplate(req, res) {
        const newTemplate = new templateModel(req.body)
        await newTemplate.save((err, data) => {
            if (err) {
                console.log(`template save failed ${err}`)
                console.log('body = ', req.body)
                return
            }
            console.log('template save success! ', data)
            res.send(data)
        })
    }
    static async apiUpdateTemplate(req,res){
        const id = req.params.id
        const text = req.body.data
        // console.log("id = ",id)
        console.log('text = ',text)
        templateModel.findByIdAndUpdate(id,{data:text},(err,data)=>{
            if(err)
            {
                console.log(`find id and update error ${err}`)
                res.send('error')
                return
            }
            res.send(data)
        })
    }
    static async apiDeleteTemplate(req,res){
        const id = req.params.id
        console.log('delete id = ',id)
        templateModel.findByIdAndDelete(id,(err,data)=>{
            if(err){
                console.log('error at delete ',err)
                return
            }
            res.send(data)
        })
    }

    static async apiCheckName(req,res){
        const name = req.query.name
        console.log('name = ',name)
        templateModel.findOne({name:name},(err,data)=>{
            if(err){
                console.log('error at find one in checkName')
                return
            }
            res.send(data)
        })
    }
    static async apiGetOneTemplate(req,res){
        const id = req.params.id
        console.log('db id  = ',id)
        templateModel.findById(id,(err,data)=>{
            if(err){
                console.log('findbyid error')
                return
            }
            console.log('data = ',data)
            res.send(data)
        })
    }
    static async apiGetTemplateUser(req,res){
        const id = req.query.id
        console.log('get template for user',id)
        templateModel.find({userId:id},(err,data)=>{
            if(err){
                console.log('find template for user error',err)
            }
            res.send(data)
        })
    }
}