        // search = req.query.search;
        // Product.find({
        //     $or: [
        //         {
        //             name: { $regex: '.*' + search + '.*', $options: 'i' }
        //         }
        //     ]
        // }).then(result => {
        //     console.log(result)
        //     const store_data=result.aggregate([
        //         {
        //             $geoNear:{
        //                 near:{type:"Point",coordinates:[parseFloat(latitude),parseFloat(logitude)]},
        //                 key:"location",
        //                 maxDistance:parseFloat(1000)*1609,
        //                 distanceField:"dist.calculated",
        //                 spherical:true
        //             }
        //         }
        //     ])
        //     var shopfind = false
        //     if (req.session.isLoggedIn) {
        //         const userid = req.session.user._id;
        //         console.log(userid)
        //         shopRegistration.findOne({ userId: userid }).then(shopuser => {
        //             if (shopuser) {
        //                 shopfind = true;
        //             }
        //             res.render('shop/search', {
        //                 prods: result,
        //                 isAuthenticated: req.session.isLoggedIn,
        //                 shopfind: shopfind
        //             })
        //         }).catch(err => {
        //             console.log(err);
        //         })
        //     }
        //     else {
        //         res.render('shop/search', {
        //             prods: result,
        //             isAuthenticated: req.session.isLoggedIn,
        //             shopfind: false
        //         })
        //     }

        // }).catch(err => {
        //     console.log(err);
        // })








        ///sharma google api code


         //start

        // function initMap() {
        //     const bounds = new google.maps.LatLngBounds();
        //     const markersArray = [];
        //     const map = new google.maps.Map(document.getElementById("map"), {
        //         center: { lat: 30.316496, lng: 78.0321979 },
        //         zoom: 10,
        //     });
        //     // initialize services
        //     const geocoder = new google.maps.Geocoder();
        //     const service = new google.maps.DistanceMatrixService();
        //     // build request
        //     const origin1 = { lat: 30.316496, lng: 78.03219179 };
        //     //const origin2 = "Greenwich, England";
        //     //const destinationA = "Stockholm, Sweden";
        //     const destinationB = { lat: 30.221399, lng: 78.780045 };

        //     const request = {
        //         origins: [origin1],
        //         destinations: [destinationB],
        //         travelMode: google.maps.TravelMode.DRIVING,
        //         unitSystem: google.maps.UnitSystem.METRIC,
        //         avoidHighways: false,
        //         avoidTolls: false,
        //     };

        //     // put request on page
        //     document.getElementById("request").innerText = JSON.stringify(
        //         request,
        //         null,
        //         2
        //     );
        //     // get distance matrix response
        //     service.getDistanceMatrix(request).then((response) => {
        //         // put response
        //         document.getElementById("response").innerText = JSON.stringify(
        //             response,
        //             null,
        //             2
        //         );

        //         // show on map
        //         const originList = response.originAddresses;
        //         const destinationList = response.destinationAddresses;

        //         deleteMarkers(markersArray);

        //         const showGeocodedAddressOnMap = (asDestination) => {
        //             const handler = ({ results }) => {
        //                 map.fitBounds(bounds.extend(results[0].geometry.location));
        //                 markersArray.push(
        //                     new google.maps.Marker({
        //                         map,
        //                         position: results[0].geometry.location,
        //                         label: asDestination ? "D" : "O",
        //                     })
        //                 );
        //             };
        //             return handler;
        //         };

        //         for (let i = 0; i < originList.length; i++) {
        //             const results = response.rows[i].elements;

        //             geocoder
        //                 .geocode({ address: originList[i] })
        //                 .then(showGeocodedAddressOnMap(false));

        //             for (let j = 0; j < results.length; j++) {
        //                 geocoder
        //                     .geocode({ address: destinationList[j] })
        //                     .then(showGeocodedAddressOnMap(true));
        //             }
        //         }
        //     });
        // }

        // function deleteMarkers(markersArray) {
        //     for (let i = 0; i < markersArray.length; i++) {
        //         markersArray[i].setMap(null);
        //     }

        //     markersArray = [];
        // }

        // window.initMap = initMap;


        //end










        //geolocation code 


            //shopRegistration.createIndexes({location:"2dsphere"})

    // const store_data=await shopRegistration.aggregate([
    //     {
    //         $geoNear:{
    //             near:{type:"Point",coordinates:[parseFloat(latitude),parseFloat(logitude)]},
    //             key:"location",
    //             maxDistance:parseFloat(1000)*1609,
    //             distanceField:"dist.calculated",
    //             spherical:true
    //         }
    //     }
    // ])

    // shopRegistration.geoNear(
    //     {type:'Point',coordinates:[parseFloat(latitude),parseFloat(logitude)]},
    //     {maxDistance:100000,spherical:true}
    // ).then(result=>{
    //     res.status(200).send({
    //         success:true,msg:"store details",result
    //     })
    // })

    //         shopRegistration.createIndexes({location:'2dsphere'})

    // shopRegistration.find({
    //     location:{
    //         $near:{
    //             $geometry:{ type:"Point",coordinates:[latitude,logitude]},
    //             $maxDistance:1000*1000
    //         }
    //     }
    // }).then(result=>{
    //     console.log(result)
    //     res.status(200).send({
    //                 success:true,msg:"store details",result
    //             })
    // }).catch(er=>{
    //     console.log(er)
    // })
