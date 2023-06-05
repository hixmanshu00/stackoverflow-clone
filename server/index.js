import  express  from "express";
import mongoose from "mongoose";
import cors from 'cors'
import userRoutes from './routes/users.js'
const app = express();
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb", extended: true}))

app.use(cors());


app.get('/',(req,res)=> {
    res.send("This is a stack overflow clone API")
})

app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000

const URL = 'mongodb+srv://hixmanshu:beginhi2.0@cluster0.vzmut3o.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> {console.log(`server running on port ${PORT}`)}))
    .catch((err)=> console.log(err.message))