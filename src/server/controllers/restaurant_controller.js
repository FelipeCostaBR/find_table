const requestify = require("requestify");
const api_key = process.env.GOOGLE_MAPS_API_KEY;

function restaurantsLocation(userLat, userLog) {
  requestify
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat},${userLog}&radius=1500&type=restaurant&key=${api_key}`
    )
    .then(response => {
      // Get the response body
      // return JSON with result declare request
      const result = response.getBody().results;
console.log(result[1])
       console.log(result[1].name)
       console.log(result[1].geometry.location)
    });
}

module.exports = restaurantsLocation;
