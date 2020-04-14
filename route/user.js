const router = require("express").Router();
const User = require('../models/User')
const bcryptjs = require("bcryptjs")
const { validateUser } = require("../validation/validation")
const validToken = require("./verifyToken")

//Method to get all users
router.get("/",validToken, async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.send(error)
    }
})

// Method to create/add new user in DB
router.post("/", async (req, res) => {
    console.log(req.body)
    const error = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)


    //check if user exist
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send("User Already Exist")

    //hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(req.body.password, salt)

    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        mobile: req.body.mobile,
        isWorking: req.body.isWorking,
    })

    try {
        const data = await user.save()
        res.json(data)
    } catch (error) {
        res.json(error)
    }

})

//Method to get single record from table / Find user
router.get("/:userID", async (req, res) => {
    try {
        const users = await User.findById(req.params.userID)
        res.send(users)
    } catch (error) {
        res.send(error)
    }
})

//Method to delete single record from table
router.delete("/:userID", async (req, res) => {
    try {
        const users = await User.remove({ _id: req.params.userID })
        res.send(users)
    } catch (error) {
        res.send(error)
    }
})

//Method to update single user
router.patch("/:userID", async (req, res) => {
    try {
        console.log(req.params.userID)
        console.log(req.body.password)
        const updatedUser = await User.updateOne({ _id: req.params.userID }, { $set: { password: req.body.password } })
        res.json(updatedUser)
    } catch (error) {
        res.send(error)
    }
})



module.exports = router;