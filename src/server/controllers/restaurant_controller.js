const axios = require("axios");
const api_key = process.env.GOOGLE_MAPS_API_KEY;
function restaurantsLocation(userLat, userLog) {
  return axios.get(
<<<<<<< HEAD
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat},${userLog}&radius=5000&type=restaurant&keyword=burger&key=${api_key}`
=======
<<<<<<< HEAD
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat},${userLog}&radius=6000&type=restaurant&keyword=burger&key=AIzaSyBS3C4jLmXkVC7pUgctJFnx4piQF41gN5Y`
=======
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat},${userLog}&radius=6000&type=restaurant&keyword=burger&key=${api_key}`
>>>>>>> f000e60... map alteration
>>>>>>> 570381d... map alterations
  )
}


function restaurantsDetails(place_id) {
  return axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${api_key}`
  )
}


module.exports = {
  restaurantsLocation,
  restaurantsDetails
}
