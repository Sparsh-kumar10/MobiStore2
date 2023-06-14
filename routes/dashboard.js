const express=require('express')
const router=express.Router()

const dashboardController=require('../controllers/dashboardController')

router.get('/add-product',dashboardController.addProduct)

router.post('/add-product',dashboardController.postAddproduct)

router.get('/all-product',dashboardController.allproduct)

router.get('/orders',dashboardController.orders)

router.get('/account-setting',dashboardController.accountsetting)

router.post('/search',dashboardController.getSearch)






module.exports=router