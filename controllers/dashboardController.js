
const Product = require('../models/product')
const mongoose = require('mongoose');
const adminProduct = require('../models/adminProduct')
const { ObjectId } = require('mongodb');
const shopRegistration = require('../models/shopRegistration');


exports.addProduct = (req, res, next) => {
    res.render('dashboard/addproduct', {
        editing: false
    })
}

exports.allproduct = (req, res, next) => {
    Product.find({ userId: req.user._id }).then(product => {
        console.log(product);
        res.render('dashboard/allproduct', {
            prods: product
        })
    })
}

exports.accountsetting = (req, res, next) => {
    res.render('dashboard/accountsetting')
}

exports.orders = (req, res, next) => {
    res.render('dashboard/orders')
}

exports.postAddproduct = async (req, res, next) => {
    const mobilename = req.body.name;
    const price = req.body.price;
    const imageurl = req.body.imageurl;
    const description = req.body.description
    const distance=0;

    const userid=req.user._id
    let shoplocation
    // console.log(userid)

    await shopRegistration.findOne({userId:userid}).then(shop=>{
        console.log(shop.Pname)
        shoplocation=Object.assign(shop)
    }).catch(err=>{
        console.log(err);
    })

    console.log(shoplocation)


    const product = new Product({
        name: mobilename,
        imageurl: imageurl,
        price: price,
        description: description,
        userId: req.user._id,
        distance:distance,
        location:shoplocation.location,
        editing: false
    });

    product.save().then(result => {
        console.log('product create');
        res.redirect('/admin/dashboard/all-product');
    }).catch(err => {
        console.log(err);
    })
}


exports.getSearch = (req, res, next) => {
    const data = req.body.search;
    console.log(data);

}


exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/')
            }
            // console.log(product)
            res.render('dashboard/addproduct', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product

            })
        })
        .catch(err => {
            console.log(err);
        })

}

exports.postEditProduct = (req, res) => {
    const prodId = req.body.productId.trim();
    const updatename = req.body.name;
    const updateprice = req.body.price;
    const updateimageurl = req.body.imageurl;
    const updatedes = req.body.description;
    // console.log(prodId)
    const newid =new mongoose.Types.ObjectId(prodId);
    
    Product.findById(prodId).then(product=>{
        product.name=updatename;
        product.price=updateprice;
        product.imageurl=updateimageurl;
        product.description=updatedes
        product.save();
        console.log('product update')
        res.redirect('/admin/dashboard/all-product');
    }).catch(err=>{
        console.log(err);
    })
    
}

exports.deleteProduct=(req,res)=>{
    const prodId=req.body.productId

    Product.findById(prodId).then(product=>{
        product.deleteOne();
        res.redirect('/admin/dashboard/all-product');
    }).catch(err=>{
        console.log(err);
    })
}