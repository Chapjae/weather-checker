
var currentDay = dayjs().format("MMM-DD-YYYY")



function getCityData(city) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=72848a6e5462cfcb20726fb97310cab3&units=imperial`

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var lat = data.coord.lat
            var lon = data.coord.lon
            
        if (data.cod == 200) {
            var city = document.getElementsByClassName("search-by-city").value
            var citiesLi = document.createElement("li") 
            var icons = document.createElement("img")
            var cityUl = document.getElementById("searched-cities")
        
            icons.src=`http://openweathermap.org/img/w/${data.weather[0].icon}.png`
            citiesLi.classList.add("city-group")
            
            citiesLi.addEventListener("click", function(){

            })
            
            cityUl.append(citiesLi)
            $("#city-name").text(data.name + " " + currentDay + "   ").append(icons)
            $("#temp").text("Temperature: " + data.main.temp + " °f")
            $("#wind").text("Wind speed: " + data.wind.speed)
            $("#humidity").text("Humidity: " + data.main.humidity)
            }

        getFiveDayForecast(lat, lon)
        })
        .catch(function (err) {
            if (err) {
                alert("City not Found!")
            }
        })
    
}

$(".btn").on("click", function() {
    var city = $(".search-by-city").val()
    getCityData(city)
})
// `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=`

function getFiveDayForecast(lat, lon){
    var requestUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=5&appid=72848a6e5462cfcb20726fb97310cab3&units=imperial`
    
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            for(var i = 0; i < data.list.length; i++) {
                var fiveDayDay = document.getElementById(`day${i}`)
                var fiveDayTemp = document.getElementById(`temp${i}`)
                var fiveDayWind = document.getElementById(`wind${i}`)
                var fiveDayHumid = document.getElementById(`humid${i}`)
                var fiveDayIcon = document.getElementById(`img${i}`)
                var fiveDayDate = dayjs()

                fiveDayDay.innerText = fiveDayDate.add(i, "day")
                fiveDayIcon.src = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
                fiveDayTemp.innerText = (data.list[i].temp.day + " °f")
                fiveDayWind.innerText = (data.list[i].speed)
                fiveDayHumid.innerText = (data.list[i].humidity)
            }    
            
            // $(".img1").src = (`http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`)
        
        })
}
