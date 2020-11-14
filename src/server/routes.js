// Create the routes for the pages
const express = require("express");
const app = express();
// const { Pool } = require("pg");
// const pool = new Pool({ database: "todo_app" });
const restaurantsLocation = require('./controllers/restaurant_controller')
let bodyParser = require('body-parser')


app.use(express.static("public"))
app.use(bodyParser.json())

app.set('views', './public')
app.set('view engine', 'ejs')


app.post('/api/user_location',(request, response) => {
    const { latitude, longitude } = request.body
    // HTTP request to find restaurants location
    // parameters is user current location
    restaurantsLocation(latitude,longitude).then(res => {
        // add restaurants tables, use place_id as key
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



// path to open the index.html in the browser
// http://localhost:3333/index.html
app.listen(3333);
