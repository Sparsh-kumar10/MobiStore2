let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

initMap();
function calcdisapi(){
  var gps1= new  google.maps.Latlng(
    29.945690, 78.164246
  )
  var gps2 = new google.maps.Latlng(
    30.316496,78.032188
  )
  var dist = google.maps.geometry.spherical.computeDistanceBetween(gps1,gps2);
  console.log(`distance is ${dist/1000}km`);
}
calcdisapi();
console.log('where')