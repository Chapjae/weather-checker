
function getCityData(city) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=72848a6e5462cfcb20726fb97310cab3&units=metric`

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var lat = data.coord.lat
            var lon = data.coord.lon
            
            $("#city-name").text(data.name) + dayjs().format("MMM-dddd-YYYY")
            $("#wind").text(data.wind.speed)
            $("#humidity").text(data.main.humidity)
            
            getFiveDayForecast(lat, lon)
        })
        .catch(function (err) {
        })
}

$(".btn").on("click", function() {
    var city = $(".search-by-city").val()
    var citiesLi = $("<li></li>").text(city);
    
    citiesLi.addClass("city-group")
    $("#searched-cities").append(citiesLi)

    getCityData(city)
})
// `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=`

function getFiveDayForecast(lat, lon){
    var requestUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=5&appid=72848a6e5462cfcb20726fb97310cab3&units=metric`
    
    fetch(requestUrl)
        .then(function (response) {
            console.log(response.json());
        })
        .then(function (data) {

        })
}
