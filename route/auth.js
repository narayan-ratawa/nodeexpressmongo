const router = require("express").Router();
const { validateLogin } = require("../validation/validation")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const axios = require('axios')
//Method to register user
router.post("/login", async (req, res) => {
    //validate data
    const error = validateLogin(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //check if user exist
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("User Not Exist")

    //validate password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send("Incorrect Password")
    try {
        //create and assign token
        const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
        res.header('auth-token',token).send(token)
        // res.send(user)
    } catch (error) {
        res.send(error)
    }
})

//TO send OTP to given mobile number
router.post("/sendOTP",async (req,res) => {
    const url = `https://2factor.in/API/V1/${process.env.SMS_API_SECRET}/SMS/${req.body.mobile}/AUTOGEN`
    axios.get(url)
        .then(response => {
            if(response.status == 200){
                res.json(response.data)
            }
            else{
                res.json({error:"SMS service error."})
            }
            
        })
        .catch(error => {
            res.json(error)
        });
})


module.exports = router;