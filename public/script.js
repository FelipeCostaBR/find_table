
// let map;

const { default: Axios } = require("axios");

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.4368, lng: 150.8887 },
//     zoom: 13,
//   });
// }

window.addEventListener('click', (event) => {
    console.log(event.target)
})

function getPosition() {
    return new Promise((res, req) => {
        navigator.geolocation.getCurrentPosition(res, req);
    });
}

function main() {
    getPosition().then(res => {
        axios.post("/api/user_location", {
            latitude:res.coords.latitude,
            longitude: res.coords.longitude
        }).then(response => {
            response.data.results.forEach(restuarant => {
                return restaurant
            })
        })
    })
}

