const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ShopUser=new Schema({
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