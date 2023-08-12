const shopRegistration = require('../models/shopRegistration')
const shopUser=require('../models/shopUser')


exports.adminHome =async (req, res, next) => {
    const userId=req.session.user._id
    let user;
     await shopUser.findById(userId).then(result=>{
        console.log(result.location[0])
        user=result
    }).catch(err=>{
        console.log(err);
    })
    res.render('admin/shopRegistration',{
        user:user,
        shopRegistration:"Shop Registration Form",
        title:"Shop Registration"
    })
}

exports.shopRegistrationPost = (req, res, next) => {

    const BussinessName = req.body.Bname;
    const PersonName = req.body.Pname;
    const PersonContact = req.body.Pnumber;
    const PersonEmail = req.body.Pemail
    const latitude = req.body.latitude;
    const logitude = req.body.logitude;

    const shopregistration = new shopRegistration({
        Bname: BussinessName,
        Pname: PersonName,
        Pnumber: PersonContact,
        Pemail: PersonEmail,
        location:{
            type:"Point",
            coordinates:[latitude,logitude]
        },
        userId:req.user

    });

    shopregistration.save().then(result=>{
        console.log('registration successful');
        res.redirect('/admin/dashboard/all-product');
    }).catch(err=>{
        console.log('error')
    })

}
