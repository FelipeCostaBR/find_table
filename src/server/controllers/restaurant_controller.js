const axios = require("axios");
const api_key = process.env.GOOGLE_MAPS_API_KEY;
function restaurantsLocation(userLat, userLog) {
  return axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat},${userLog}&radius=5000&type=restaurant&keyword=burger&key=AIzaSyBbvORrbPRjpS0ODBKgEoInOe-95x1HiVo`
  )
}


function restaurantsDetails(place_id) {
  return axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=AIzaSyBbvORrbPRjpS0ODBKgEoInOe-95x1HiVo`
  )
}


module.exports = {
  restaurantsLocation,
  restaurantsDetails
}
