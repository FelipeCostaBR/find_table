let map;
let iconImage = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

function initMap() {
  let options = {
    center: { lat: -12.7502038, lng: 14.8621315 }, // set a default
    zoom: 13,
  };
  map = new google.maps.Map(document.getElementById("map"), options);

  main();

}

function addMarker(props) {
      var marker = new google.maps.Marker({
      position: props.coords,
      map: props.map,
    });

    //check for customIcon
    if (props.iconImage) {
      marker.setIcon(props.iconImage)
    }

    // check name
    if(props.name) {
     var infoWindow = new google.maps.InfoWindow({
        content: props.name
      })
      marker.addListener('click', () => {
        infoWindow.open(props.map, marker)
      })
    }
}

function getPosition() {
  // Simple wrapper
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej, {enableHighAccuracy: true});
  });
}
// wait for getPosition to complete
function main() {
  getPosition().then((res) => {

    const { latitude, longitude } = res.coords;
    // change the map location to the current user using browser GPS
    map.setCenter({ lat: latitude, lng: longitude });
    // add marker for the user location
    addMarker(
      {coords: {lat: latitude, lng: longitude }, map}
      );

    axios
      .post("/api/user_location", {
        latitude: latitude,
        longitude: longitude,
      })
      .then((response) => {
        // response with all the restaurants
        response.data.results.forEach((restaurant) => {
          let RestaurantCoors = restaurant.geometry.location;
          // add a restaurants marker
          addMarker(
            {coords: RestaurantCoors, map, iconImage, name: `<h2>${restaurant.name}</h2><button>➡️</button>`}
            );
            
        });
      });
  });
}



