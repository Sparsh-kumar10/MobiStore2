const mongoose=require('mongoose')
const Schema=mongoose.Schema

const adminProduct=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('adminProduct',adminProduct);