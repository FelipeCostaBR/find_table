const axios = require("axios");
const api_key = process.env.GOOGLE_MAPS_API_KEY;
function restaurantsLocation(userLat, userLog) {
  return axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat},${userLog}&radius=6000&type=restaurant&keyword=burger&key=AIzaSyABL4y3J8mON1Db0z4-C-ExwOSZ-W-VHrY`
  );
}

function restaurantsDetails(place_id) {
  return axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=AIzaSyABL4y3J8mON1Db0z4-C-ExwOSZ-W-VHrY`
  );
}

module.exports = {
  restaurantsLocation,
  restaurantsDetails,
};
