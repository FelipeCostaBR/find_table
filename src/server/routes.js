// Create the routes for the pages
const express = require("express");
const app = express();
// const { Pool } = require("pg");
// const pool = new Pool({ database: "todo_app" });
app.set('views', './public')
app.set('view engine', 'ejs')

const { restaurantsLocation } = require('./controllers/restaurant_controller')
const { restaurantsDetails } = require('./controllers/restaurant_controller')

let bodyParser = require('body-parser');


app.set('views', './public')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + "public"))
app.use(bodyParser.json())


app.set('views', './public')
app.set('view engine', 'ejs')


app.post('/api/user_location',(request, response) => {
    const { latitude, longitude } = request.body
    // HTTP request to find restaurants location
    // parameters is user current location
    restaurantsLocation(latitude,longitude).then(res => {
        response.json(res.data)
    })
})

app.get('/restaurant/details', (request, response) => {
    response.render('restaurant_details')
})


// app.get('/restaurant', (request, response) => {
//     // rendering templates
//     response.render('restaurant_map')
// });

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


app.get('/restaurant/details/:place_id',(request, response) => { 
    const { place_id } = request.params
    if(!place_id.includes('.')){
        // HTTP request to find restaurants info
       // parameters is place id from front-end
       restaurantsDetails(place_id).then(res => {
           response.render('restaurant_details',{restaurantsInfo: res.data.result})
       })
    }
})


// path to open the index.html in the browser
// http://localhost:3333/index.html
app.listen(3333);


// PLaces API: Pl9AIzaSyD4AHUaAEtY1X5EpSfn8bPZW1SwVMqBpG4

// maps javascript API: AIzaSyDgyjupXJdzaQcPUB66eGDY8VcjZLwTT8M
