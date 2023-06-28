const Product = require('../models/product')

exports.homePage = (req, res, next) => {
    let search = '';
    if (req.query.search) {
        search = req.query.search;
        Product.find({
            $or: [
                { 
                    name: { $regex: '.*' + search + '.*' ,$options: 'i'}
                }
            ]
        }).then(result => {
            console.log(result)
            res.render('shop/search', {
                prods: result,
                isAuthenticated: req.session.isLoggedIn
            })
        }).catch(err => {
            console.log(err);
        })
    }
    else{
        res.render('shop/home', {
            isAuthenticated: req.session.isLoggedIn
        })
    }

}

exports.productpage=(req,res)=>{
    const prodId=req.params.productId;
    Product.findById(prodId).then(product=>{
        console.log(product)
        res.render('shop/productPage',{
            isAuthenticated: req.session.isLoggedIn
        })
    })
}