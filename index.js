const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 8088;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "RESTAPI";
const user = require("./models/User");
const cors = require("cors");
const fileUpload = require("express-fileupload")
const registrationRoute = require("./route/registration");
const loginRoute = require("./route/login");
const createRecipeRoute = require("./route/create_recipe");
const getRecipeRoute = require("./route/get_recipe");
app.use(express.json())
app.use(cors());
app.use(fileUpload());

const url = `mongodb+srv://admin:admin@cluster0.eiw6la9.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("connected successfully")
    }
})

app.get('/', (req,res)=>{
    res.send("App started");
})

app.use('/api', registrationRoute)
app.use('/api', loginRoute)

app.use('/recipe', (req, res, next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token, secret, function(err, decode){
            if(err){
                return res.status(403).json({
                    status:"Failed",
                    message : "Invalid token"
                })
            }
            console.log(decode);
            req.user = decode.data;
            next();
        })
    }
    else{
        res.status(403).json({
            status:"Failed",
            message:"User is not authenticated"
        })
    }
})

app.use('/recipe', createRecipeRoute);
app.use('/recipe', getRecipeRoute)

app.listen(port, console.log(`app listening at ${port}`))