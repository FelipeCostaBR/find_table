const axios = require("axios");
const api_key = process.env.GOOGLE_MAPS_API_KEY;

function restaurantsLocation(userLat, userLog) {
  return axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat},${userLog}&radius=5000&type=restaurant&keyword=burger&key=${api_key}`
  )
}

module.exports = restaurantsLocation;
