const { validationResult } = require('express-validator');
const shopUser = require('../models/shopUser')
const ShopUser = require('../models/shopUser')

// const {validationResult}=require('express-validator/check')



exports.login = (req, res, next) => {
    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message,
        oldInput: {
            email: "",
            password: ""
        },
        validationErrors: []
    })
}

exports.signup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message,
        oldInput: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationErrors: []
    });
}

exports.postlogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password
            },
            validationErrors: errors.array()
        });
    }

    ShopUser.findOne({ email: email, password: password }).then(user => {
        if (!user) {
            return res.status(422).render('auth/login', {
                path: '/login',
                pageTitle: 'Login',
                errorMessage: 'Invalid email or password',
                oldInput: {
                    email: email,
                    password: password
                },
                validationErrors: errors.array()
            })
        }
        console.log('user found');
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(err => {
            console.log(err)
            res.redirect('/');
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.postsignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword=req.body.confirmPassword
    const name = req.body.name;
    const mobileNumber = req.body.mobile

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                name:name,
                email: email,
                mobile:mobileNumber,
                password: password,
                confirmPassword: confirmPassword
            },
            validationErrors: errors.array()
        });
    }

    const shopuser = new ShopUser({
        name: name,
        mobile: mobileNumber,
        email: email,
        password: password,
        location: [0,0]
    })

    shopuser.save().then(result => {
        console.log('user created')
        res.redirect('/')
    }).catch(err => {
        console.log(err);
    })
}

exports.postlogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/')
    });
}

exports.location = (req, res) => {
    const userid = req.session.user._id;
    const langi = req.body.langi;
    const longi = req.body.longi;

    shopUser.findById(userid).then(user => {
        user.location = [langi, longi]
        user.save();
        console.log('update the location')
        res.status(201).json({
            message: 'location update successfully',
            post: user
        })
    }).catch(err => {
        console.log(err);
    })
    console.log('i am')
}