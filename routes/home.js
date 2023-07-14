const express=require('express')
const router=express.Router();
const homeController=require('../controllers/homeController');
const userController=require('../controllers/userController')

const bodyParser = require('body-parser');


router.get('/',homeController.homePage);

router.post('/',homeController.location)

router.get('/user/cart',userController.cart)

router.get('/productDetail/:productId',homeController.productpage)

router.post('/find-nearest-store',homeController.find_store)

module.exports=router;