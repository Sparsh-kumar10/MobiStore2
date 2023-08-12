const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ShopUser=new Schema({
    name:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:[],
    }
})

module.exports=mongoose.model('ShopUser',ShopUser);