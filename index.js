const bodyParser = require('body-parser')
const express = require("express");
const mongoose = require("mongoose")
require('dotenv').config()
const app = express();
const createUser = require('./route/user')
const auth = require('./route/auth')

app.use(bodyParser.json())

//TODO:need to add env pack
//DB connection
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (db) => {
    console.log("Connected to DB" + db)
})

//add user operations - ROUTE
app.use("/post", createUser)
//add auth -ROUTE
app.use("/auth",auth)

//sample code
app.get("/", (req, res) => {
    res.send("sample")
})
app.get("/posts", (req, res) => {
    res.send("POST")
})

//run app on port
app.listen(8081)