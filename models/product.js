const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const ProductSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'shopRegistration',
        required:true
    },
    distance:{
        type:Number
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
    }
});

module.exports=mongoose.model('Product',ProductSchema)