import express from 'express'
import RouteCtrl from './route.controller.js'

const router = express.Router();

router.route('/').get((req,res)=>{
    res.send("hello world\nYou are at root")
})

router.route('/users')
.get(RouteCtrl.apiGetUser)
.post(RouteCtrl.apiAddUser)

router.route('/users/:id')
.get(RouteCtrl.apiGetOneUser)

router.route('/templates')
.get(RouteCtrl.apiGetTemplates)
.post(RouteCtrl.apiAddTemplate)
export default router;
