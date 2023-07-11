function getGeocode() {
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=London&APPID=72848a6e5462cfcb20726fb97310cab3`
    
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data[0].lat
            data[0].lon
        })
}

function getCity(lat, lon) {
    var requestUrl = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}lon=${lon}&dt=1643803200&appid=72848a6e5462cfcb20726fb97310cab3`

}