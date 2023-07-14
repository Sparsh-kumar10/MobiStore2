
function initMap() {
  const service = new google.maps.DistanceMatrixService();
  
  const origin1 = { lat: 30.316496, lng: 78.03219179 };

  const destinationB = { lat: 30.221399, lng: 78.780045 };
  
  const request = {
    origins: [origin1],
    destinations: [ destinationB],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };


  service.getDistanceMatrix(request).then((response) => {
    console.log(response)
  });
}


window.initMap = initMap;