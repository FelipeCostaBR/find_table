let RestaurantListContainer = document.querySelector(
  ".restaurant-list-container"
);

let map;
let iconImage =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

function initMap() {
  
  let options = {
    center: { lat: -12.7502038, lng: 14.8621315 }, // set a default
    zoom: 13,
    // mapTypeId: "satellite",
    tilt: 45,
    heading: 90
  };
  map = new google.maps.Map(document.getElementById("map"), options);
  // const panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), 
  // {
  //   position: Sydney,
  //   pov: {
  //     heading: 34,
  //     pitch: 30,
  //   },
  //   motionTracking: false,
  //   motionTrackingControl: false
  // }
  // )
  // map.setStreetView(panorama)
  main();
}
// map.setTilt(45)

// function initPano() {
//   const panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'))
// }

// function toggleStreetView() {
//   const toggle = panorama.getVisible();
//   if (toggle == false) {
//     panorama.setVisible(true)
//   } else {
//     panorama.setVisible(false)
//   }
// }

function addMarker(props) {
  var marker = new google.maps.Marker({
    position: props.coords,
    map: props.map,
  });

  //check for customIcon
  if (props.iconImage) {
    marker.setIcon(props.iconImage);
  }

  // add restaurant name in the infoWindow
  if (props.name) {
    var infoWindow = new google.maps.InfoWindow({
      content: props.name,
    });
    // listening for a click in the market to open the specific infoWindow
    marker.addListener("mouseover", () => {
      infoWindow.open(props.map, marker);
    });
    // google.maps.event.addListener(infoWindow, "domready", function () {
    //   restaurantDetails();
    // });
  }
}


function restaurantDetailsForm(restaurant) {
  return `<form action="/restaurant/details/${restaurant.place_id}">
            <h2>${restaurant.name}</h2>
            <button data-id="${restaurant.place_id}" class="restaurant-details-btn">GO
            </button>
          </form>`;
}


function getPosition() {
  // Simple wrapper
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej, {
      enableHighAccuracy: true,
    });
  });
}

function createRestaurantList(restaurant) {
  let restaurantList = document.createElement("div");
  restaurantList.className = "restaurant-list";
  RestaurantListContainer.appendChild(restaurantList);

  let name = document.createElement("p");
  name.className = "restaurant-name";
  name.setAttribute("data-id", restaurant.place_id);
  name.innerHTML = `Name: ${restaurant.name}`;

  let openNow = document.createElement("p");
  openNow.className = "restaurant-open-now";
  // check if opening hours is  undefined
  // if (typeof restaurant.opening_hours.open_now == 'undefined') {
    // openNow.innerHTML = `Open now: information not available`;
  // } else {
    openNow.innerHTML = `Open now: ${restaurant.opening_hours.open_now}`;
  // }

  let rating = document.createElement("p");
  rating.className = "restaurant-rating";
  rating.innerHTML = `Rating: ${restaurant.rating}`;

  let vicinity = document.createElement("p");
  vicinity.className = "restaurant-rating";
  vicinity.innerHTML = `Address: ${restaurant.vicinity}`;

  restaurantList.appendChild(name);
  restaurantList.appendChild(openNow);
  restaurantList.appendChild(rating);
  restaurantList.appendChild(vicinity);
}

// wait for getPosition to complete
function main() {

  getPosition().then((res) => {
    const { latitude, longitude } = res.coords;
    // change the map location to the current user using browser GPS

    map.setCenter({ lat: latitude, lng: longitude });
    // add marker for the user location
    addMarker({ coords: { lat: latitude, lng: longitude }, map });

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
          addMarker({
            coords: RestaurantCoors,
            map,
            iconImage,
            // create a form with button to redirect to the restaurant details
            //create a data-id with place_id
            name: restaurantDetailsForm(restaurant),
          });
          //list of Restaurant
          createRestaurantList(restaurant);
        });
      });
  });
}

// function init() {
//     const Sydney = { lat: -33.868820, lng: 151.209290 }
//     const map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 4,
//         mapTypeId: "satellite",
//         center: Sydney,
//         heading: 90,
//         tilt: 45
//     })
//     map.setTilt(45)

//     const string = '<p>Sample text about how appealing Sydney is.</p>'
//     const infoWindow = new google.maps.Infowindow({ content: string })
//     const marker = new google.maps.Marker({
//         position: Sydney,
//         map,
//         title: 'Sydney'
//     });
//     marker.addEventListener('click', () => {
//         infoWindow.open(map, marker);
//     });
// }

// function rotate90() {
//     const heading = map.getHeading() || 0;
//     map.setHeading(heading + 90);
// }

// function autoRotate() {
//     if (map.Tilt() !==0) {
//         window.setInterval(rotate90, 3000);
//     }
// }


// business_status: "OPERATIONAL"
// geometry: {location: {…}, viewport: {…}}
// icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png"
// name: "RocoMamas"
// opening_hours: {open_now: true}
// photos: [{…}]
// place_id: "ChIJkQGqdRZp1moRcr3nAEBbLAA"
// plus_code: {compound_code: "6VGQ+PP Maribyrnong, Victoria", global_code: "4RJ66VGQ+PP"}
// price_level: 2
// rating: 4.5
// reference: "ChIJkQGqdRZp1moRcr3nAEBbLAA"
// scope: "GOOGLE"
// types: (5) ["meal_takeaway", "restaurant", "food", "point_of_interest", "establishment"]
// user_ratings_total: 223
// vicinity: "Level 1 Shop 1103/120-200 Rosamond Rd, Maribyrnong"

//res.data.result.reviews

//res.data.result.reviews[0]
// restaurantsInfo.reviews[0]
