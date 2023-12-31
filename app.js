const cors = require('cors')
const express = require ('express')
const bodyParser = require('body-parser')
const mongoose = require ('mongoose')
const bookRouter = require ('./router/bookRouter')
const userRouter = require ('./router/user')
const bookSchema = require ('./schemas/bookSchemas')
const URL = "mongodb+srv://gemy3588:123gemy123@cluster0.mstyudw.mongodb.net/Book-Api?retryWrites=true&w=majority"
const app = express()
app.use(bodyParser.json())

const connectDB = () =>{
    try {
        mongoose.set ('strictQuery',false)
        mongoose.connect(URL)
        console.log("Connected to DB successfully");
    } catch (error) {
        
    }
}
connectDB()


app.use ('/',bookRouter)
app.use ('/' ,userRouter)


app.listen(7000)