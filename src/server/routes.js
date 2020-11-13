// Create the routes for the pages
const express = require("express");
const app = express();
const { Pool } = require("pg");
const pool = new Pool({ database: "todo_app" });
const restaurantsLocation = require('./controllers/restaurant_controller')
const api_key = process.env.GOOGLE_MAPS_API_KEY;
let bodyParser = require('body-parser')


app.use(express.static("public"))
app.use(bodyParser.json())

app.set('views', './public')
app.set('view engine', 'ejs')



app.post('/api/user_location',(request, res) => {
    const { latitude, longitude } = request.body
    // HTTP request to find restaurants location
    // parameters is user current location
    restaurantsLocation(latitude,longitude).then(response => {
        // add restaurants tables, use place_id as key
        res.json(response.data)

    })
})

app.get('/restaurant', (request, response) => {
    // rendering templates
    response.render('restaurant_map', {api_key: api_key})
});

// path to open the index.html in the browser
// http://localhost:3333/index.html
app.listen(3333);
