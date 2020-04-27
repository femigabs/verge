const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const joi = require("@hapi/joi")

dotenv.config()



const salt = bcrypt.genSaltSync(10);
const hashPassword = password => bcrypt.hashSync(password, salt);

const generateUserToken = (email, id, first_name, last_name, is_admin, state) => {
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ 
        id,
        email, 
        first_name, 
        last_name,
        is_admin, 
        state }, key, { expiresIn: '1h' });
    return token;
};

const schema = {
    user: joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        first_name: joi.string().max(100).required(),
        last_name: joi.string().max(100).required(),
        state: joi.string().max(30).required()
    }),

    login: joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
    }),

    parcel: joi.object({
        price: joi.number(),
        weight: joi.string().required(),
        location: joi.string().required(),
        destination: joi.string().required(),
        sender_name: joi.string().required(),
        sender_note: joi.string()
    }),

    idparams:{
        id: joi.number().required(),
        user_id: joi.number().required()
    }
};



module.exports = {
    hashPassword,
    generateUserToken,
    schema
}