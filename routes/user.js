const express=require('express')
const router=express.Router();
const userController=require('../controllers/userController')

router.get('/cart',userController.cart);



module.exports=router