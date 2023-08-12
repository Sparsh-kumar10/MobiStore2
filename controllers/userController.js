const user = require('../models/shopUser')
const product = require('../models/product')
const shopRegistration=require('../models/shopRegistration')
const shopUser=require('../models/shopUser')

// module.exports.cart=(req,res)=>{
//     const search=req.query.origin
//     const userId=req.session.user._id;

//     user.findById(userId).then(user=>{
//         user.location=search;
//         user.save()
//         res.render('shop/cart')
//     }).catch(err=>{
//         console.log(err);
//     })
// }

module.exports.order =async (req, res) => {
    const userId=req.session.user._id
    let user;
    await shopUser.findById(userId).then(user=>{
        console.log(user)
        user=user
    }).catch(err=>{
        console.log(err)
    })

    const productId = req.body.productId
    console.log(productId)
    let productdetail;

    let shopId;
    let shopdetail;
    await product.findById(productId).then(result => {
        productdetail=result
        console.log(result)
        shopId=result.userId

    }).catch(err=>{
        console.log()
    })

    await shopRegistration.findOne({userId:shopId}).then(shop=>{
        console.log(shop)
        shopdetail=shop
    }).catch(err=>{
        console.log(err)
    })
    res.render('shop/order',{
        prod:productdetail,
        shop:shopdetail,
        user:req.session.user._id
    })
}