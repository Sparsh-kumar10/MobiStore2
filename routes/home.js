const express=require('express')
const router=express.Router();
const homeController=require('../controllers/homeController');
const paymetController=require('../controllers/paymentController')
const is_auth=require('../midleware/is-auth')

const bodyParser = require('body-parser');


router.get('/',homeController.homePage);

router.get('/api',homeController.search)

router.post('/',homeController.location)

router.use('/user',require('./user'))

router.post('/createOrder',is_auth,paymetController.createOrder)

// router.get('/productDetail/:productId',homeController.productpage)

// router.post('/find-nearest-store',homeController.find_store)

module.exports=router;