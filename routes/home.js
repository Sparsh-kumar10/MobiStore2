const express=require('express')
const router=express.Router();
const homeController=require('../controllers/homeController');
const webAdmin=require('../controllers/webadmincontroller')

const Product=require('../models/product')
const bodyParser = require('body-parser');
var jsonParser=bodyParser.json()


router.get('/',homeController.homePage);

router.get('/search',(req,res)=>{
    res.render('search')
})

router.post('/search',jsonParser, async (req,res)=>{
    
    let payload=req.body.payload.trim();
    let search= await Product.find({name:{$regex:new RegExp('^'+payload+'.*','i')}}).exec();
    console.log(search)
    res.send({payload:search})
})

// router.get('/websiteAdmin',webAdmin.home);

// router.post('/websiteAdmin/addProduct',webAdmin.addProduct)

// router.get('/websiteAdmin/product',webAdmin.allproduct)

module.exports=router;