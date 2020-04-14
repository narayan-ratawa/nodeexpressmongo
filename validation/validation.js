const Joi = require("@hapi/joi")

const schemaUser = {
    name : Joi.string().min(6).required(),
    email : Joi.string().email().required(),
    mobile : Joi.string().min(10).required(),
    password : Joi.string().min(6).required(),
    isWorking : Joi.boolean().required()
}

const schemaLogin = {
    email : Joi.string().email().required(),
    password : Joi.string().min(6).required()
}

const validateUser = (data) =>{
    const { error } = Joi.validate(data,schemaUser);
    return error;
}

const validateLogin = (data) =>{
    const { error } = Joi.validate(data,schemaLogin);
    return error;
}
 

module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
