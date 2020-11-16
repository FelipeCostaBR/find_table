let RestaurantListContainer = document.querySelector(
  ".restaurant-list-container"
);

let map;
let infoWindows = [];
let iconImage =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

function initMap() {
  
  let options = {
    center: { lat: -12.7502038, lng: 14.8621315 }, // set a default
    zoom: 13,
    tilt: 45,
    heading: 90
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
    marker.setIcon(props.iconImage);
  }

  // add restaurant name in the infoWindow
  if (props.name) {
    var infoWindow = new google.maps.InfoWindow({
      content: props.name,
    });
    infoWindows.push(infoWindow)
    // listening for a click in the market to open the specific infoWindow
    marker.addListener("mouseover", () => {
      infoWindows.forEach(w => {
        w.close() 
      })
      infoWindow.open(props.map, marker);
    });

    // marker.addListener('mouseout' , () => {
    //   infoWindow.close()
    // })
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
  if (restaurant.opening_hours.open_now) {
    openNow.innerHTML = `Open now 😋`;  
  } else {
    openNow.innerHTML = `Close 🥺`;  
  }
  

  let rating = document.createElement("p");
  rating.className = "restaurant-rating";
  rating.innerHTML = `Rating: ${restaurant.rating}`;

  let vicinity = document.createElement("p");
  vicinity.className = "restaurant-rating";
  vicinity.innerHTML = `${restaurant.vicinity}`;

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
