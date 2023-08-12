const { ObjectId } = require('mongodb')
const Product = require('../models/product')
const shopRegistration = require('../models/shopRegistration')
const shopUser = require('../models/shopUser')
const { default: mongoose } = require('mongoose')

let olatitude
let olongitude


module.exports.search=async (req,res,next)=>{
    const userid = req.session.isLoggedIn ? req.session.user._id : null;
    console.log(userid)
    if(userid){
        shopUser.findById(userid).then(shopuser=>{
            olatitude=shopuser.location[0]
            olongitude=shopuser.location[1]
            console.log(shopuser.location[0])
        }).catch(er=>{
            console.log(err)
        })
    }

    if (req.query.search) {

        const search = req.query.search;




        const productSearchPromise = Product.aggregate([
            {
              $match: {
                name: { $regex: '.*' + search + '.*', $options: 'i' }
              }
            },
            {
              $lookup: {
                from: 'shopregistrations', // The name of the ShopRegistration collection in the database
                localField: '_id', // The field from the Product collection to match
                foreignField: 'product', // The field from the ShopRegistration collection to match
                as: 'shopRegistration' // The name of the field to store the matched documents
              }
            }
          ]).exec();

        const distance = require('google-distance-matrix');

        // Define the origin coordinates (latitude and longitude)
        const origin = `${olatitude},${olongitude}`;

        (async function () {
            try {
                const productResults = await productSearchPromise;


                for (let i = 0; i < productResults.length; i++) {
                    const destination = `${productResults[i].location.coordinates[0]},${productResults[i].location.coordinates[1]}`;

                    distance.key('google-key');
                    distance.units('imperial');

                    const distances = await new Promise((resolve, reject) => {
                        distance.matrix([origin], [destination], (err, distances) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(distances);
                            }
                        });
                    });


                    if (!distances || distances.status !== 'OK') {
                        console.log(destination + ' is not reachable by land from ' + origin);
                        continue;
                    }

                    const distanceInMiles = distances.rows[0].elements[0].distance.value * 0.000621371; // Convert distance to miles
                    productResults[i].distance = distanceInMiles * 1.609
                    console.log(productResults[i].distance)
                    const shopid=productResults[i].userId
                    console.log(shopid)
                    const shopdetail=await shopRegistration.findOne({userId:shopid}).exec()
                    console.log(shopdetail)
                    productResults[i].shopRegistration=shopdetail

                }

                productResults.sort((a, b) => a.distance - b.distance);

 

                console.log(productResults)
                // res.render('shop/search', {
                //     prods: productResults,
                //     isAuthenticated: req.session.isLoggedIn,
                //     shopfind: shopfind
                // });

                res.status(200).send({seccuss:true,data:productResults})

            } catch (error) {
                console.log(error);
            }
        })();



    }

}



exports.homePage = async (req, res, next) => {

    // if (req.user) {
    //     shopUser.findById(req.user._id).then(user => {
    //         // console.log(user)
    //         latitude = user.location[0]
    //         logitude = user.location[1]
    //         // console.log(latitude)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }
    

        var shopfind = false
        if (req.session.isLoggedIn) {
            const userid = req.session.user._id;

            let userDetail;
            shopUser
                .findById(userid)
                .then((result) => {
                    userDetail = result;
                    return shopRegistration.findOne({ userId: userid });
                })
                .then((result) => {
                    if (result) {
                        shopfind = true;
                    }
                    res.render('shop/home', {
                        isAuthenticated: req.session.isLoggedIn,
                        shopfind: shopfind,
                        userDetail: userDetail,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    // Handle the error appropriately, e.g., redirect to an error page or return an error response.
                });

        }
        else {
            res.render('shop/home', {
                isAuthenticated: req.session.isLoggedIn,
                shopfind: false
            })
        }

    

}

exports.location = (req, res) => {
    // console.log(req.body.langi)
    if (req.session.isLoggedIn) {
        const userid = req.session.user._id;
        const lanti = req.body.langi;
        const longi = req.body.longi;
        console.log(lanti+"and and"+longi)
        shopUser.findById(userid).then(user => {
           
            user.location = [lanti, longi];
            user.save();
            res.status(201).json({
                message: 'location update successfully',
            })
        }).catch(err => {
            console.log(err)
        })

    } else {
        olatitude=req.body.langi
        olongitude=req.body.longi
        console.log('location::'+req.body.langi)
        res.status(201).json({
            message: 'user not logged in'
        })
    }
}



exports.productpage = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        console.log(product.location)

        res.render('shop/productPage2', {
            isAuthenticated: req.session.isLoggedIn,
            produc: product
        })
    })
}






// //nearest store find
// exports.find_store = async (req, res) => {

//     const latitude = req.body.latitude;
//     const logitude = req.body.logitude;


//     shopRegistration.createIndexes({ location: '2dshpere' })


//     try {
//         const store_data = await shopRegistration.aggregate([
//             {
//                 $geoNear: {
//                     near: { type: "Point", coordinates: [parseFloat(latitude), parseFloat(logitude)] },
//                     key: "location",
//                     maxDistance: parseFloat(1000) * 1609,
//                     distanceField: "dist.calculated",
//                     spherical: true
//                 }
//             }
//         ])

//         res.status(200).send({
//             success: true, message: "nearset store find successfully", stors: store_data
//         })
//     } catch (error) {
//         res.status(400).send({
//             success: false, message: error.message
//         })
//     }
// }