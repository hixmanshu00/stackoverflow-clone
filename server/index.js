import express  from "express";
import mongoose from "mongoose";
import cors from 'cors'
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import postRoutes from './routes/post.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import path from "path";


const app = express();
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb", extended: true}))


app.use(cors());
// app.use(express.static(path.join(__dirname,'/public')))
// app.use('/uploads', express.static('uploads'))
dotenv.config()

app.get('/',(req,res)=> {
    res.send("This is a stack overflow clone API")
})

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)
app.use('/post', postRoutes)

const PORT = process.env.PORT || 5000

const URL = process.env.CONNECTION_URL

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> {console.log(`server running on port ${PORT}`)}))
    .catch((err)=> console.log(err.message))


app.use(bodyParser.json());



    
