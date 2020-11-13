function getLocation() {
    if(navigator.geolocation) {
navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function geoSuccess(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        alert("lat:" + lat + " lng:" + lng);
    }

    
    function geoError() {
        alert("Geocoder failed.");
    }
    