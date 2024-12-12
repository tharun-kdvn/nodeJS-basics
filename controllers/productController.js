const Product = require('../models/productModel');

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
async function getProductHandler(req, res) {
    try{
        const productData = await Product.find();
        if(!productData){
            res.status(404).json({
                message: 'No Data Found'
            })
        }
        else{
            res.status(200).json({
                message: 'Data Found',
                data: productData
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
async function getProductByIdHandler(req, res) {
    try{
        const {id} = req.params
        const productData = await Product.findById(id);
        if(!productData){
            res.status(404).json({
                message: 'No Data Found'
            })
        }
        else{
            res.status(200).json({
                message: 'Data Found',
                data: productData
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
async function addProductHandler(req, res) {
    try {
        console.log(req.body);
        const productData = req.body;
        const product = await Product.create(productData);
        res.status(200).json(
            {
                message: 'Product added to DB',
                data: product,
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
async function updateProductHandler(req, res){
    try{
    const {id} =  req.params;
    console.log('id', id)
    const product = await Product.findByIdAndUpdate(id, req.body);
    console.log('product in update func',product);
    if(!product){
        res.status(404).json({
            message: "Product not found"
        })
    }
    else{
                res.status(200).json({
                    message: "Product found and record updated",
                    // data: newProduct,
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
async function deleteProductHandler(req, res){
    try{
        const {id} =  req.params;
        console.log('id', id)
        const product = await Product.findByIdAndDelete(id);
        console.log('product in update func',product);
        if(!product){
            res.status(404).json({
                message: "Product not found"
            })
        }
        else{
                    res.status(200).json({
                        message: "Product found and record deleted",
                        // data: newProduct,
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
    getProductHandler,
    getProductByIdHandler,
    addProductHandler,
    updateProductHandler,
    deleteProductHandler,
    checkInput
}