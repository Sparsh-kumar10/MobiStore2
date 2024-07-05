const express=require('express')
const router=express.Router()
const adminController=require('../controllers/adminController')
const dashboardController=require('../controllers/dashboardController')

const is_auth=require('../midleware/is-auth')




router.get('/shopResitration',is_auth,adminController.adminHome)

router.use('/user',require('./adminAuth'));

router.post('/registration',adminController.shopRegistrationPost);

router.use('/dashboard',is_auth,require('./dashboard'))

module.exports=router;