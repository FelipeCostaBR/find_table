// Create the routes for the pages
const express = require("express");
const app = express();
const { Pool } = require("pg");
// const pool = new Pool({ database: "todo_app" });
var bodyParser = require('body-parser')
var requestify = require('requestify')
// var map 
// var service
// var infowindow

app.set('views', './public')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + "public"))
app.use(bodyParser.json())

var api_key = process.env.GOOGLE_MAPS_API_KEY;

requestify.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyDgyjupXJdzaQcPUB66eGDY8VcjZLwTT8M`).then((response) => {
    var result = response.getBody().results
    console.log(result)
});

app.post()

// function initialize() {
//     var Cruise_Bar = new google.maps.LatLng(-33.8587323, 151.2100055)
// }

// var service = new google.maps.places.PlacesService(map);
// service.nearbySearch(request, callback);

// app.get('/', (req, res) => {
//     res.send(`code`)
// }

// https://maps.googleapis.com/maps/api/place/nearbysearch/output?parameters


// app.post('/restaurant_details', server_function1)

// app.create('/restaurant_details')



// path to open the index.html in the browser
// http://localhost:3333/index.html
app.listen(3333);


// PLaces API: Pl9AIzaSyD4AHUaAEtY1X5EpSfn8bPZW1SwVMqBpG4

// maps javascript API: AIzaSyDgyjupXJdzaQcPUB66eGDY8VcjZLwTT8M
