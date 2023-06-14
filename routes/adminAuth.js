const express=require('express')
const router=express.Router();

const authController=require('../controllers/authController')

router.get('/login',authController.login)

router.get('/signup',authController.signup)

router.post('/signup',authController.postsignup)

router.post('/login',authController.postlogin)

router.post('/logout',authController.postlogout)


module.exports=router;