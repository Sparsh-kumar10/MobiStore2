const express=require('express')
const router=express.Router();
const userController=require('../controllers/userController')
const paymetController=require('../controllers/paymentController')
const is_auth=require('../midleware/is-auth')

router.post('/order',is_auth,userController.order);






module.exports=router