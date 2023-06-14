const express=require('express')
const router=express.Router()
const adminController=require('../controllers/adminController')
const dashboardController=require('../controllers/dashboardController')



router.get('/shopResitration',adminController.adminHome)

router.use('/user',require('./adminAuth'));

router.post('/registration',adminController.shopRegistrationPost);

router.use('/dashboard',require('./dashboard'))

module.exports=router;