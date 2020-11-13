let map;

let userLat =  -37.750203899999995
let userLog = 144.8621315


function initMap() {
  const home = { lat: userLat, lng: userLog }
    map = new google.maps.Map(document.getElementById("map"), {
    center: home,
    zoom: 13,
  });
  // set the marker in the home
  const userMarker = new google.maps.Marker({
    position: home,
    map: map
  })
}




function getPosition() {
  // Simple wrapper
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}
// wait for getPosition to complete

function main() {
  getPosition().then((res) => {
    // userLat = res.coords.latitude
    // userLog = res.coords.longitude
    axios
      .post("/api/user_location", {
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
      })
      // .then((response) => {
      //   // console.log(response.data);
      // });
  });
}

main()
// lat: -37.750203899999995, lng: 144.8621315