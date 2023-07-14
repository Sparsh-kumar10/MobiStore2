const shopRegistration = require('../models/shopRegistration')


exports.adminHome = (req, res, next) => {
    res.render('admin/shopRegistration')
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
