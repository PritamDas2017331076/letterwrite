import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import router from './api/route.js'
import userRouter from './api/users.js'

dotenv.config()

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.URI;
console.log('uri = ', uri)
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection established")
})
app.use('/api/letter-template', router);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})