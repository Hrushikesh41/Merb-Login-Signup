const express = require("express");
const dotenv = require("dotenv");
require("./db/conn");
const User = require("./db/schema");
const cors = require("cors");


dotenv.config({path : "./config.env"});

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors({
    origin: ["http://localhost:3000", "*"],
    methods: ["GET", "POST"],
    credentials: true
}))



const port = process.env.PORT;

// linking the routing files
app.use(require("./routing/auth"))


// creating middleware

const middleware = (req, res, next)=>{
    console.log("This is middleware");
    next();
}

app.get("/", (req, res)=>{
    res.send("Welcome to Mern Stack Hrushikesh");
});

app.get("/about", middleware,  (req, res)=>{
    res.send("Welcome to About Page of Mern Stack Hrushikesh");
});

app.get("/contact", (req, res)=>{
    res.send("Welcome to Contact Page of Mern Stack Hrushikesh");
});

app.get("/login", (req, res)=>{
    res.send("Welcome to Login Page of Mern Stack Hrushikesh");
});

app.get("/signup", (req, res)=>{
    res.send("Welcome to SignUp page of Mern Stack Hrushikesh");
});


app.listen(port, ()=>{
    console.log(`App running at port `+port);
});