import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema;

const SALT_FACTOR = 10;


const userSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamp: true
});

userSchema.methods.toJSON = function() {
    const userr = this.toObject()
    delete userr.password
        /* delete userr.tokens */
    return userr;
}

userSchema.methods.generateAuthToken = async function() {
    const userr = this
    console.log("userrr ", userr)
    const token = await jwt.sign({ _id: userr._id.toString() }, 'thisisnewuser')
    console.log("token : ", token)
    userr.tokens = userr.tokens.concat({ token });
    console.log("userr again ", userr)
    await userr.save((err, data) => {
        if (err) console.log(err)
        else console.log('success ', data)
    })
    return token;
}




userSchema.statics.findByCredentials = async(user, password) => {
    try {
        const userr = await User.findOne({ user })
        if (!userr) {
            return 'user not found'
        }
        const isMatch = await bcrypt.compare(password, userr.password)
        if (!isMatch) {
            return 'pass not matched'
        }
        return userr;
    } catch (e) {
        return "Can't log in"
    }
}

userSchema.pre('save', async function(next) {
    const Userr = this
    if (Userr.isModified('password')) {
        Userr.password = await bcrypt.hash(Userr.password, 8);
    }
    next();
})

const User = mongoose.model('User', userSchema);

export default User;