// common JS module way of writing which does synchronous loading of the modules
const express = require('express');
require('dotenv').config() // This will access the values in .env file and make it available in process.env
// console.log(process.env, 'process.env');
const mongoose = require('mongoose');
const fs = require("fs");
const file = fs.readFileSync('./users.json', 'utf-8')
JSON.parse(file)
console.log(file.users);
let userData = JSON.parse(file);
// console.log(userData,'userData at initialization');
const PORT = process.env.PORT || 3000;
// console.log(require('dotenv').config());
const app = express();

// connecting to DB

mongoose.connect(process.env.DB_URL).then((connection)=>{
    // console.log(connection, 'connected to DB');
    console.log('connected to DB')
}).catch((err)=>{
    console.log(err,'error')
})

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

// In this case its a global middleware that converts every request into JSON format
app.use(express.json());

// app.use((req, res, next) => {
//     if (Object.keys(req.body).length === 0) {
//         res.status(400).json({
//             message:'Bad request'});
//     }
//     else {
//         console.log("Hello from Next");
//         next();
//     }
// })
// Route Handlers
app.get('/api/user', getUserHandler)

app.get('/api/user/:id', getUserByIdHandler)


app.post('/api/addUser', addUserHandler)

app.put('/api/updateUser/:id',updateUserHandler)

app.delete('/api/deleteUser/:id',deleteUserHandler)

// DB CRUD Ops
async function getUserHandler(req, res) {
    try{
        const userData = await User.find();
        if(!userData){
            res.status(404).json({
                message: 'No Data Found'
            })
        }
        else{
            res.status(200).json({
                message: 'Data Found',
                data: userData
            })
        }

    }
    catch(err){
        res.status(500).json({
            message: 'Error occured',
            error:err
        })
    }
}
async function getUserByIdHandler(req, res) {
    try{
        const {id} = req.params
        const userData = await User.findById(id);
        if(!userData){
            res.status(404).json({
                message: 'No Data Found'
            })
        }
        else{
            res.status(200).json({
                message: 'Data Found',
                data: userData
            })
        }

    }
    catch(err){
        res.status(500).json({
            message: 'Error occured',
            error:err
        })
    }
}
async function addUserHandler(req, res) {
    try {
        console.log(req.body);
        const userData = req.body;
        const user = await User.create(userData);
        res.status(200).json(
            {
                message: 'User added to DB',
                data: user,
            }
        )
    }
    catch (err) {
        res.json({
            statusCode: 500,
            message: err,
        })
    }
}
async function updateUserHandler(req, res){
    try{
    const {id} =  req.params;
    console.log('id', id)
    const user = await User.findByIdAndUpdate(id, req.body);
    console.log('user in update func',user);
    if(!user){
        res.status(404).json({
            message: "User not found"
        })
    }
    else{
                res.status(200).json({
                    message: "User found and record updated",
                    // data: newUser,
                }) 
        //     }
        // })
        
    }
        }
        catch(err){
            console.log(err);
            res.status(500).json({message:'Internal server error'});
        }

}
async function deleteUserHandler(req, res){
    try{
        const {id} =  req.params;
        console.log('id', id)
        const user = await User.findByIdAndDelete(id);
        console.log('user in update func',user);
        if(!user){
            res.status(404).json({
                message: "User not found"
            })
        }
        else{
                    res.status(200).json({
                        message: "User found and record deleted",
                        // data: newUser,
                    }) 
            //     }
            // })
            
        }
            }
            catch(err){
                console.log(err);
                res.status(500).json({message:'Internal server error'});
            }

}



// File system CRUD
// function getUserHandler(req, res) {
//     res.json({
//         status: 'success',
//         code: 200,
//         data: {
//             name: 'Tharun'
//         }
//     })
// }
// function addUserHandler(req, res) {
//     try {
//         console.log(req.body);
//         userData.users.push(req.body);
//         console.log(userData,'userData');
//         fs.writeFile('./users.json', JSON.stringify(userData),(err)=>{
//             if(err){
//                 throw new Error(err)
//             }
//             res.json({
//                 message: 'User added successfully'
//             })
//         });
        
//     }
//     catch (err) {
//         res.json({
//             message: 'User is not added. Please try again'
//         })
//     }
// }
// function updateUserHandler(req, res){
//     try{
//     const {id} =  req.params;
//     const remainingUsers = userData.users.filter((item)=> item.id != id);
//     remainingUsers.push(req.body);
//     console.log(remainingUsers, 'remainingUsers')
//     userData.users = remainingUsers;
//     console.log(userData,'userData after the updation');
//     fs.writeFile('./users.json',JSON.stringify(userData),(err)=>{
//         if(err){
//             throw new Error(err);
//         }
//         res.json(
//             {
//                 message: 'Record updated successfully'
//             }
//         )
//     })
//         }
//         catch(err){
//             console.log(err);
//             res.status(500).message('Internal server error');
//         }

// }
// function deleteUserHandler(req, res){
//     try{
//     const {id} =  req.params;
//     const remainingUsers = userData.users.filter((item)=> item.id != id);
//     console.log(remainingUsers, 'remainingUsers')
//     userData.users = remainingUsers;
//     console.log(userData,'userData after the updation');
//     fs.writeFile('./users.json',JSON.stringify(userData),(err)=>{
//         if(err){
//             throw new Error(err);
//         }
//         res.json(
//             {
//                 message: 'Record deleted successfully'
//             }
//         )
//     })
//         }
//         catch(err){
//             console.log(err);
//             res.status(500).message('Internal server error');
//         }

// }

// This use will run for any kind of request 
app.use((req, res) => {
    res.status(200).send('Hello World');
})
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});