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
    location:{
        type:{
            type:String,
            default:"Point"
        },
        coordinates:{
            type:[Number],
            index:"2dsphere"
        }
    },

    userId:{
        type:Schema.Types.ObjectId,
        ref:'shopUser',
        required:true
    }
})



module.exports=mongoose.model('ShopRegistration',ShopRegisrationSchema);