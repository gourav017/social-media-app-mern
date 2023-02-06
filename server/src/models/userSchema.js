const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    verifytoken:{
        type: String,
    }
});

const userdb = new mongoose.model("user", userSchema);

module.exports = userdb;


