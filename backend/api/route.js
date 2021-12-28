import express from 'express'
import RouteCtrl from './route.controller.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.route('/').get((req, res) => {
    res.send("hello world\nYou are at root")
})

router.route('/users')
    .get(RouteCtrl.apiGetUser)

router.route('/users/add')
    .post(RouteCtrl.apiAddUser)
    //router.post('/users/add', RouteCtrl.apiAddUser)

router.route('/users/:id')
    .get(RouteCtrl.apiGetOneUser)

router.route('/users/login')
    .post(RouteCtrl.apiUserLogin)

router.route('/users/logout')
    .get(auth, RouteCtrl.apiUserLogout)

//router.get('/users/logout', auth, RouteCtrl.apiUserLogout)

router.route('/users/me')
    .get(auth, RouteCtrl.apiGetCurrentUser)

//router.get('/users/me', auth, RouteCtrl.apiGetCurrentUser)

router.route('/templates')
    .get(RouteCtrl.apiGetTemplates)
    .post(RouteCtrl.apiAddTemplate)
router.route('/templates/:id')
    .delete(RouteCtrl.apiDeleteTemplate)
    .post(RouteCtrl.apiUpdateTemplate)
    .get(RouteCtrl.apiGetOneTemplate)
router.route('/templates/name')
    .get(RouteCtrl.apiCheckName)
export default router;