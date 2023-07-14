var currentDay = dayjs().format("MMM-DD-YYYY")
var loadSearchedCities = JSON.parse(localStorage.getItem("searchedCities"))
// var parseSearchedCities = (loadSearchedCities)
var cityUl = document.getElementById("searched-cities")

loadSearchedCities.forEach(function(loadSearchedCities) {
    var citiesLi = document.createElement("li");
    citiesLi.classList.add("city-group", "list-group-item", "list-group-item-action",  "active")
    citiesLi.textContent = loadSearchedCities
    cityUl.appendChild(citiesLi)
})


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
            var citySearch = document.getElementById("searchInput").value;
            var citiesLi = document.createElement("li");
            var icons = document.createElement("img");
            var cityUl = document.getElementById("searched-cities");
            var city = document.getElementById("city-name");
            var temp = document.getElementById("temp");
            var wind = document.getElementById("wind");
            var humid = document.getElementById("humidity");
        
            icons.src=`https://openweathermap.org/img/w/${data.weather[0].icon}.png`
            
            citiesLi.classList.add("city-group", "list-group-item", "list-group-item-action",  "active")
            citiesLi.textContent = citySearch
            
            var existingLi = Array.from(cityUl.getElementsByTagName("li")).find(function(li) {
                return li.textContent === citySearch;
            });

            if(!existingLi) {
                cityUl.appendChild(citiesLi)
            }
            
            city.textContent = "City: " + data.name + " " + currentDay + "   ";
            city.appendChild(icons)
            
            temp.textContent ="Temperature: " + data.main.temp + " °f"
            wind.textContent ="Wind speed: " + data.wind.speed
            humid.textContent ="Humidity: " + data.main.humidity
            
            citiesLi.addEventListener("click", function() {
                getCityData(this.textContent);
            })
            
            var liElements = Array.from(cityUl.getElementsByTagName("li"));
            var cityTexts = liElements.map(function(li) {
              return li.textContent;
            });

            localStorage.setItem("searchedCities", JSON.stringify(cityTexts));
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

function getFiveDayForecast(lat, lon){
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=5&appid=72848a6e5462cfcb20726fb97310cab3&units=imperial`
    
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
        })
}
