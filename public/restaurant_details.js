
// let location = "flinders station"

axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyBkmV_Zjm_qQKWMlKwSpBFGvrS2uHEfL8s`).then(response => console.log(response))

function initMap() {
    Sydney = {lat: -33.868820, lng: 151.209290};
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: Sydney,
    });
    const marker = new google.maps.Marker({
        position: Sydney,
        map: map
    })
}

var location = document.querySelector()