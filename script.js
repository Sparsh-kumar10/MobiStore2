var distance = require('google-distance-matrix');

var origins = ['30.3165, 78.0322'];
var destinations = ['29.9457, 78.1642'];

distance.key('AIzaSyC-AGJY9dKQB4hCuNsTlZPCC_z87wR3LBc');
distance.units('imperial');

distance.matrix(origins, destinations, function (err, distances) {
    if (err) {
        return console.log(err);
    }
    if(!distances) {
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        for (var i=0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
                if (distances.rows[i].elements[j].status == 'OK') {
                    var distance = distances.rows[i].elements[j].distance.text;
                    console.log(distance.split(' ')[0]*1.6)
                } else {
                    console.log(destination + ' is not reachable by land from ' + origin);
                }
            }
        }
    }
});