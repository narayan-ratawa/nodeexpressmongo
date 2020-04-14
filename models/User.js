const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6
    },
    email:{
        type:String,
        required:true,
        min:6
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    mobile:{
        type:String,
        required:true,
        min:6
    },
    isWorking:{
        type:Boolean,
        required:true,
        default:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User',userSchema)