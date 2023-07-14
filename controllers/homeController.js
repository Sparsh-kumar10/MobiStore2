const Product = require('../models/product')
const shopRegistration = require('../models/shopRegistration')
const shopUser = require('../models/shopUser')

let latitude = 30.226025
let longitude = 78.811378






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



    let search = '';
    if (req.query.search) {

        const search = req.query.search;
        const userid = req.session.isLoggedIn ? req.session.user._id : null;

        // // Perform the product search
        // const productSearchPromise = Product.find({
        //     name: { $regex: '.*' + search + '.*', $options: 'i' }
        // }).exec();

        // // Perform the geospatial search using the $geoNear aggregation pipeline
        // const geoSearchPromise = shopRegistration.findOne({ userId: userid })
        //     .then(shopuser => {
        //         if (shopuser) {
        //             return Product.aggregate([
        //                 {
        //                     $geoNear: {
        //                         near: { type: "Point", coordinates: [parseFloat(latitude), parseFloat(logitude)] },
        //                         key: "location",
        //                         maxDistance: parseFloat(1000) * 1609,
        //                         distanceField: "dist.calculated",
        //                         spherical: true
        //                     }
        //                 }
        //             ]).exec();
        //         } else {
        //             return []; // Return an empty array if user is not registered as a shop
        //         }
        //     });


        //     distance.key('AIzaSyC-AGJY9dKQB4hCuNsTlZPCC_z87wR3LBc');

        // // Execute both promises concurrently
        // Promise.all([productSearchPromise, geoSearchPromise])
        //     .then(([productResults, geoResults]) => {
        //         const shopfind = geoResults.length > 0;

        //         console.log('1');
        //         // Add distance to product results
        //         // const resultsWithDistance = productResults.map(product => {

        //         var distance = require('google-distance-matrix');
        //          for (var i = 0; i < productResults.length; i++) {
        //             const origins = [`${latitude},${logitude}`]
        //             const destinations = [`${productResults[i].location.coordinates[0]},${productResults[i].location.coordinates[1]}`]

        //             distance.key('key');

        //             distance.units('imperial');

        //             var productDistance;

        //             distance.matrix(origins, destinations, function (err, distances) {
        //                 if (err) {
        //                     return console.log(err);
        //                 }
        //                 if (!distances) {
        //                     return console.log('no distances');
        //                 }
        //                 if (distances.status == 'OK') {
        //                     for (var i = 0; i < origins.length; i++) {
        //                         for (var j = 0; j < destinations.length; j++) {
        //                             if (distances.rows[i].elements[j].status == 'OK') {
        //                                 var distance = distances.rows[i].elements[j].distance.text;
        //                                 console.log('2')
        //                                 productDistance.insert(distance.split(' ')[0] * 1.6)
        //                                 console.log(productDistance)
        //                             } else {
        //                                 console.log(destinations + ' is not reachable by land from ' + origins);
        //                             }
        //                         }
        //                     }
        //                 }
        //             });

        //             productResults[i].distance = `${distance}`
        //         }

        //         console.log('3')
        //         console.log(productResults)
        //         console.log('4')
        //         // res.render('shop/search', {
        //         //     prods: productResults,
        //         //     isAuthenticated: req.session.isLoggedIn,
        //         //     shopfind: shopfind
        //         // });
        //         res.status(200).send({
        //             success: true, message: "nearset store find successfully", stors: productResults,distance:distance
        //         })
        //     }).then(result=>{

        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.render('error', { message: 'An error occurred' });
        //     });
        const productSearchPromise = Product.find({
            name: { $regex: '.*' + search + '.*', $options: 'i' }
        }).exec();

        const distance = require('google-distance-matrix');

        // Define the origin coordinates (latitude and longitude)
        const origin = `${latitude},${longitude}`;

        (async function () {
            try {
                const productResults = await productSearchPromise;

                for (let i = 0; i < productResults.length; i++) {
                    const destination = `${productResults[i].location.coordinates[0]},${productResults[i].location.coordinates[1]}`;

                    distance.key('AIzaSyC-AGJY9dKQB4hCuNsTlZPCC_z87wR3LBc');
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
                    productResults[i].distance = distanceInMiles
                }

                productResults.sort((a, b) => a.distance - b.distance);

                console.log(productResults)
                res.render('shop/search', {
                    prods: productResults,
                    isAuthenticated: req.session.isLoggedIn,
                    shopfind: shopfind
                });

            } catch (error) {
                console.log(error);
            }
        })();



    }
    else {
        var shopfind = false
        if (req.session.isLoggedIn) {
            const userid = req.session.user._id;
            console.log(userid)
            shopRegistration.findOne({ userId: userid }).then(result => {
                if (result) {
                    shopfind = true;
                }
                res.render('shop/home', {
                    isAuthenticated: req.session.isLoggedIn,
                    shopfind: shopfind
                })
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            res.render('shop/home', {
                isAuthenticated: req.session.isLoggedIn,
                shopfind: false
            })
        }

    }

}

exports.location = (req, res) => {
    if (req.session.isLoggedIn) {
        const userid = req.session.user._id;
        const lanti = req.body.langi;
        const longi = req.body.longi;

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






//nearest store find
exports.find_store = async (req, res) => {

    const latitude = req.body.latitude;
    const logitude = req.body.logitude;


    shopRegistration.createIndexes({ location: '2dshpere' })


    try {
        const store_data = await shopRegistration.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(latitude), parseFloat(logitude)] },
                    key: "location",
                    maxDistance: parseFloat(1000) * 1609,
                    distanceField: "dist.calculated",
                    spherical: true
                }
            }
        ])

        res.status(200).send({
            success: true, message: "nearset store find successfully", stors: store_data
        })
    } catch (error) {
        res.status(400).send({
            success: false, message: error.message
        })
    }
}