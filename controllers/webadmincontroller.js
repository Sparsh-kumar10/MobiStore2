
const adminProduct=require('../models/adminProduct')

exports.home=(req,res,next)=>{
    res.render('webadmin/home')
}

exports.addProduct=(req,res,next)=>{
    const name=req.body.name;
    const description=req.body.description;
    const imageurl=req.body.imageurl

    const product=new adminProduct({
        name:name,
        description:description,
        imageurl:imageurl
    })
    product.save().then(result=>{
        console.log('product add successfuly')
        res.redirect('/websiteAdmin')
    }).catch(err=>{
        console.log(err);
    })
}

exports.allproduct=(req,res,next)=>{
    adminProduct.find().then(prod=>{
        res.render('webadmin/product',{
            prods:prod
        })
    }).catch(err=>{
        console.log(err);
    })
    
}