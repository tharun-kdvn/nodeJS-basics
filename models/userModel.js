const mongoose = require('mongoose');

// creating the schema

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    password: {
        type:String,
        required: true,
        minLenght: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validator:{
            validate: function(){
                return this.password === this.confirmPassword
            },
            message: 'Password and Confirm Password should match'
        }
    },
    email:{
        type: String,
    }
    // phNo: {
    //     type: Integer,
    //     required: true,

    // }
})

//Model

const User = mongoose.model('User', userSchema)

module.exports = User;