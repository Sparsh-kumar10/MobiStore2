// async function getDirections(origin, destination, apiKey) {
//     const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   }
  
//   // Example usage
//   const apiKey = 'AIzaSyC-AGJY9dKQB4hCuNsTlZPCC_z87wR3LBc';
//   const origin = '30.219999313354492,78.77999877929688'; // Latitude and longitude of San Francisco
//   const destination = '29.94569,78.164246'; // Latitude and longitude of Los Angeles
  
//   console.log(destination[0])
//   getDirections(origin, destination, apiKey)
//     .then(directions => {
//       console.log(directions);
//       // Parse the response and extract the necessary details
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
  

const DistanceMatrix = require('google-distance-matrix').default;

function calculateDistanceMatrix() {
  const origins = ['30.316496,78.03219179'];
  const destinations = ['30.221399,78.780045'];

  const distanceMatrix = new DistanceMatrix({
    key: 'AIzaSyC-AGJY9dKQB4hCuNsTlZPCC_z87wR3LBc',
  });

  distanceMatrix.getDistanceMatrix({
    origins,
    destinations,
    mode: 'driving',
    units: 'metric',
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

calculateDistanceMatrix();