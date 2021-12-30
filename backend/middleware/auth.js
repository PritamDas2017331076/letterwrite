import jwt from 'jsonwebtoken'
import User from '../db/user.js'
const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = await jwt.verify(token, 'thisisnewuser')
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token })
        if (!user)
            throw new Error()
        req.token = token
        req.user = user
        console.log('user in authjs ', req.user)
        next();
    } catch (e) {
        res.status(403).send({ error: "error in Authentication" })
    }
}

export default auth;