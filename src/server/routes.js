// Create the routes for the pages
const express = require("express");
const app = express();
const path = require('path');

app.use(express.static(path.join( 'public'))); 

app.set('views', './public')
app.set('view engine', 'ejs')

const { restaurantsLocation } = require('./controllers/restaurant_controller')
const { restaurantsDetails } = require('./controllers/restaurant_controller')

let bodyParser = require('body-parser');
app.use(bodyParser.json())


app.post('/api/user_location',(request, response) => {
    const { latitude, longitude } = request.body
    // parameters is user current location
    restaurantsLocation(latitude,longitude).then(res => {
        response.json(res.data)
    })
})

app.get('/restaurant/details/:place_id',(request, response) => { 
    const { place_id } = request.params
    if(!place_id.includes('.')){
       // parameters is place id from front-end
       restaurantsDetails(place_id).then(res => {
           response.render('restaurant_details',{restaurantsInfo: res.data.result})
       })
    }
})


// path to open the index.html in the browser
// http://localhost:3333/index.html
app.listen(3333);
