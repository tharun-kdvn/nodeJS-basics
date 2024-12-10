const User = require('../models/userModel');

//Validation

function checkInput(req, res,next) {
    if (Object.keys(req.body).length === 0) {
                res.status(400).json({
                    message:'Bad request'});
            }
            else {
                console.log("Hello from Next");
                next();
            }
}

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

module.exports={
    getUserHandler,
    getUserByIdHandler,
    addUserHandler,
    updateUserHandler,
    deleteUserHandler,
    checkInput
}