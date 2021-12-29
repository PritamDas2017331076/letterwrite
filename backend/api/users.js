import express from 'express'
import User from '../db/user.js'
import auth from '../middleware/auth.js'
const router = express.Router();

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/me', auth, async(req, res) => {
    try {
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/add', async(req, res) => {
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    console.log('here is result')
    console.log(req.body)

    // try {
    //     User.findOne({ user: user }, function(err, user) {

    //         console.log("user is ", user);
    //         console.log('we are here')
    //         if (user) console.log('fine one lol')


    //         if (user) {
    //             console.log('just stop it')
    //             console.log('This user is used')
    //             alert('User is used')
    //             return
    //         }
    //     })
    // } catch {
    //     console.log('user is used')
    // }

    const newUser = new User({ user, email, password });
    console.log(newUser)

    try {
        const token = await newUser.generateAuthToken();
        console.log("token in api", token)
        res.status(200).send({ newUser, token })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.route('/login').post(async(req, res) => {
    try {
        console.log(req.body.user)
        console.log(req.body.password)
        const userr = await User.findByCredentials(req.body.user, req.body.password)
        const token = await userr.generateAuthToken()
        res.status(200).send({ userr, token })
    } catch (e) {
        res.status(400).json(e)
    }
})

router.get('/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
            //req.user.tokens = []
        await req.user.save();
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

export default router;