
// let location = "flinders station"

axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyBkmV_Zjm_qQKWMlKwSpBFGvrS2uHEfL8s`).then(response => console.log(response))


