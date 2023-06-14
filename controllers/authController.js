const ShopUser = require('../models/shopUser')

exports.login = (req, res, next) => {
    res.render('auth/login')
}

exports.signup = (req, res, next) => {
    res.render('auth/signup')
}

exports.postlogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    ShopUser.findOne({email:email,password:password}).then(user=>{
        if(!user){
            console.log('user not found');
            return res.redirect('/admin/user/login')
        }
        console.log('user found');
        req.session.isLoggedIn=true;
        req.session.user=user;
        return req.session.save(err=>{
            console.log(err)
            res.redirect('/');
        })
    }).catch(err=>{
        console.log(err);
    })
}

exports.postsignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const shopuser = new ShopUser({
        email: email,
        password: password
    })

    shopuser.save().then(result => {
        console.log('user created')
        res.redirect('/')
    }).catch(err => {
        console.log(err);
    })
}

exports.postlogout=(req,res,next)=>{
    req.session.destroy(err=>{
        console.log(err);
        res.redirect('/')
    });
}