// common JS module way of writing which does synchronous loading of the modules
const express = require('express');
require('dotenv').config() // This will access the values in .env file and make it available in process.env
// console.log(process.env, 'process.env');
const mongoose = require('mongoose');

//model imports
const User = require('./models/userModel');

// controller imports
 const {
    getUserHandler,
    getUserByIdHandler,
    addUserHandler,
    updateUserHandler,
    deleteUserHandler,
    checkInput
} = require('./controllers/userController')

const {
    getProductHandler,
    getProductByIdHandler,
    addProductHandler,
    updateProductHandler,
    deleteProductHandler,
    // checkInput
} = require('./controllers/productController')
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
// this would validate all the request if they are not empty
// app.use(checkInput);
// Route Handlers
app.get('/api/user', getUserHandler)

app.get('/api/user/:id', getUserByIdHandler)

// As input is compulsory for POST, PUT and DELETE, we chain the middleware here
app.post('/api/addUser',checkInput, addUserHandler)

app.put('/api/updateUser/:id',checkInput,updateUserHandler)

app.delete('/api/deleteUser/:id',deleteUserHandler)

// Route Handlers for products
app.get('/api/product', getProductHandler)

app.get('/api/product/:id', getProductByIdHandler)

// As input is compulsory for POST, PUT and DELETE, we chain the middleware here
app.post('/api/product',checkInput, addProductHandler)

app.put('/api/product/:id',checkInput,updateProductHandler)

app.delete('/api/product/:id',deleteProductHandler)





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