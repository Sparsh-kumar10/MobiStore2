const mongoose=require('mongoose');
const { shopRegistration } = require('../controllers/adminController');

const Schema=mongoose.Schema;

const ShopRegisrationSchema=new Schema({
    Bname:{
        type:String,
        required:true
    },
    Pname:{
        type:String,
        required:true
    },
    Pnumber:{
        type:String,
        required:true
    },
    Pemail:{
        type:String,
        required:true
    },
    storelocation:[
        {
            type:String,
            require:true
        },
        {
            type:String,
            require:true
        }

    ],
    userId:{
        type:Schema.Types.ObjectId,
        ref:'shopUser',
        required:true
    }
})


module.exports=mongoose.model('ShopRegistration',ShopRegisrationSchema);