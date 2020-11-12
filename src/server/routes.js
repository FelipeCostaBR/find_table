// Create the routes for the pages
const express = require("express");
const app = express();
const { Pool } = require("pg");
const pool = new Pool({ database: "todo_app" });
var bodyParser = require('body-parser')

app.use(express.static("public"))

app.use(bodyParser.json())

var api_key = process.env.GOOGLE_MAPS_API_KEY;

var requestify = require('requestify'); 

requestify.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=${api_key}`).then((response) => {

    // Get the response body
const result = response.getBody().results

// console.log(result[1].name)
// console.log(result[1].photos[0].photo_reference)

// console.log(result[1].rating)
// console.log(result[1].opening_hours.open_now)
// console.log(result[1].place_id)
});


// path to open the index.html in the browser
// http://localhost:3333/index.html
app.listen(3333);
