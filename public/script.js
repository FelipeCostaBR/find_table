let map;

function initMap() {

  let home = {
    center: { lat: -12.750203899999995, lng: 14.8621315 }, // set a default
    zoom: 13,
  };
  map = new google.maps.Map(document.getElementById("map"), home);
  
  main();
}

function addMarker(coords, map) {
  const userMarker = new google.maps.Marker({
    position: coords,
    map: map,
    icon:
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",
  });
}

function getPosition() {
  // Simple wrapper
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}
// wait for getPosition to complete
function main() {
  getPosition().then(res => {
    // change the map location to the current user using browser GPS
    map.setCenter({lat: res.coords.latitude, lng: res.coords.longitude})
    axios
      .post("/api/user_location", {
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
      }).then(response => {
        // response with all the restaurants
        response.data.results.forEach(restaurant => {
           let coors = restaurant.geometry.location
          // add a restaurants marker 
           addMarker(coors, map);
        })
      });
  });
}

// lat: -37.750203899999995, lng: 144.8621315
