const mongoose = require('mongoose');


//
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is a required field']
    },
    price:{
        type:Number,
        required: [true, 'Price is a required field'],
    },
    discountedPrice:{
        type:Number,
        validate:{
            validator: function (){
                return this.discountedPrice < this.price
            },
            message: 'Discounted Price should be less than the price'
        }
    },
    categories:{
        type:[[String],"Categories should be a array"],
    }

});

const Product =  mongoose.model('product',productSchema);

module.exports = Product;