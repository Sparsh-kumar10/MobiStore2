
const Product=require('../models/product')
const adminProduct=require('../models/adminProduct')


exports.addProduct=(req,res,next)=>{
    res.render('dashboard/addproduct')
}

exports.allproduct=(req,res,next)=>{
    Product.find({userId: req.user._id}).then(product=>{
        console.log(product);
        res.render('dashboard/allproduct',{
            prods:product
        })
    })
}

exports.accountsetting=(req,res,next)=>{
    res.render('dashboard/accountsetting')
}

exports.orders=(req,res,next)=>{
    res.render('dashboard/orders')
}

exports.postAddproduct=(req,res,next)=>{
    const mobilename=req.body.name;
    const price=req.body.price;
    const imageurl=req.body.imageurl;
    const description=req.body.description

    const product=new Product({
        name:mobilename,
        imageurl:imageurl,
        price:price,
        description:description,
        userId:req.user
    });

    product.save().then(result=>{
        console.log('product create');
        res.redirect('/admin/dashboard/all-product');
    }).catch(err=>{
        console.log(err);
    })
}


exports.getSearch=(req,res,next)=>{
    const data=req.body.search;
    console.log(data);

}