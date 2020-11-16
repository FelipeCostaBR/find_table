let RestaurantListContainer = document.querySelector('.restaurant-list-container')

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
      
        marker.addListener('mouseover', () => {
          infoWindow.open(props.map, marker)
        
        })
        marker.addListener('mouseout' , () => {
          infoWindow.close()
        })
        
    }
}

function getPosition() {
  // Simple wrapper
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej, {enableHighAccuracy: true});
  });
}


function createRestaurantList(restaurant) {
  let restaurantList = document.createElement("div")
  restaurantList.className = 'restaurant-list'
  RestaurantListContainer.appendChild(restaurantList)

  let name = document.createElement("p")
  name.className= 'restaurant-name'
  name.innerHTML = `Name: ${restaurant.name}`
  

  let openNow = document.createElement("p")
  openNow.className= 'restaurant-open-now'
   // check if opening hours is not defined
    restaurant.opening_hours.open_now
    ? openNow.innerHTML = `Open now: ${restaurant.opening_hours.open_now}`
    : openNow.innerHTML = `Open now: ${false}`
  

  let rating = document.createElement("p")
  rating.className= 'restaurant-rating'
  rating.innerHTML = `Rating: ${restaurant.rating}` 

  let vicinity = document.createElement("p")
  vicinity.className= 'restaurant-rating'
  vicinity.innerHTML = `Address: ${restaurant.vicinity}`

  restaurantList.appendChild(name)
  restaurantList.appendChild(openNow)
  restaurantList.appendChild(rating)
  restaurantList.appendChild(vicinity)
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
            // Add Restaurant list
            createRestaurantList(restaurant)
        });
      });
  });
}


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