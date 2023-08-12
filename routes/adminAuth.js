const express=require('express')
const router=express.Router();
const shopuser=require('../models/shopUser')

const {body,req}=require('express-validator')

const authController=require('../controllers/authController')

router.get('/login',authController.login)

router.get('/signup',authController.signup)

router.post('/signup',
[
    body("email")
      .isEmail()
      .withMessage("Please Enter valid a Email")
      .normalizeEmail()
      .custom((value, { req }) => {

        console.log(req.body.passwrod);
        return shopuser.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-mail exists already, please pick a different one."
            );
          }
        });
      }),
    body(
      "password",
      "Please enter a pssword with only numbers and tex ant at least 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),

    //this one have a proble. problem is that req.body.password is undefinde so that password checking process is not completed

    // body('confirmPassword').trim().custom((value,{req})=>{
    //     console.log(value+"   "+ req.body.passwrod)
    //     if(value!==req.body.passwrod){
    //         throw new Error('Passwords have to match');
    //     }
    //     return true;

    // })
  ],authController.postsignup)

router.post('/login',[
    body("email")
        .isEmail()
        .withMessage("please Enter the valid Email")
        .normalizeEmail()
        .custom((value,{req})=>{
            return shopuser.findOne({email:value}).then(userDoc=>{
                if(!userDoc){
                    return Promise.reject(
                        'E-mail not exists'
                    )
                }
            })
        }),
        body(
            "password",
            "Please enter a valid password"
        )
        .isLength({min:5})
        .isAlphanumeric()
        .trim()
]
,authController.postlogin)

router.post('/logout',authController.postlogout)

module.exports=router;