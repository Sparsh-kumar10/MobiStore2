const user=require('../models/shopUser')

module.exports.cart=(req,res)=>{
    const search=req.query.origin
    const userId=req.session.user._id;

    user.findById(userId).then(user=>{
        user.location=search;
        user.save()
        res.render('shop/cart')
    }).catch(err=>{
        console.log(err);
    })
    
  
}