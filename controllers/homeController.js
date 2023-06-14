const product = require('../models/product');
const Product = require('../models/product')

exports.homePage = (req, res, next) => {
    let search = '';
    if (req.query.search) {
        search = req.query.search;
        Product.find({
            $or: [
                { name: { $regex: '.*' + search + '.*' } }
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