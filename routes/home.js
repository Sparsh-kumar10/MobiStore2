const express=require('express')
const router=express.Router();
const homeController=require('../controllers/homeController');

const bodyParser = require('body-parser');


router.get('/',homeController.homePage);

router.get('/productDetail/:productId',homeController.productpage)

module.exports=router;