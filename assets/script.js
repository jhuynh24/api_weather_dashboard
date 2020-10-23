$(document).ready(function () {

  // Global variables
  var forecastHeader = document.getElementById("5-day-forecast");
  var day1 = document.getElementById("day1");
  var day2 = document.getElementById("day2");
  var day3 = document.getElementById("day3");
  var day4 = document.getElementById("day4");
  var day5 = document.getElementById("day5");
  var date1 = document.getElementById("date1");
  var icon1 = document.getElementById("icon1");
  var temp1 = document.getElementById("temp1");
  var hum1 = document.getElementById("hum1");
  var date2 = document.getElementById("date2");
  var icon2 = document.getElementById("icon2");
  var temp2 = document.getElementById("temp2");
  var hum2 = document.getElementById("hum2");
  var date3 = document.getElementById("date3");
  var icon3 = document.getElementById("icon3");
  var temp3 = document.getElementById("temp3");
  var hum3 = document.getElementById("hum3");
  var date4 = document.getElementById("date4");
  var icon4 = document.getElementById("icon4");
  var temp4 = document.getElementById("temp4");
  var hum4 = document.getElementById("hum4");
  var date5 = document.getElementById("date5");
  var icon5 = document.getElementById("icon5");
  var temp5 = document.getElementById("temp5");
  var hum5 = document.getElementById("hum5");
  var currentCity = document.getElementById("currentCity");
  var temperature = document.getElementById("temperature");
  var humidity = document.getElementById("humidity");
  var windSpeed = document.getElementById("windSpeed");
  var uvIndex = document.getElementById("uvIndex");
  var forecastIcon = document.getElementById("forecastIcon");
  var apiKey = "b31c9f1d993581058980e2aea6f43116";
  var searchButton = document.getElementById("searchButton");
  var searchResults = document.getElementById("search-history");
  


//API for the current weather of the searched city.
  function cityWeather(city) {
    var query = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    $.ajax({
      url: query,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      currentCity.textContent = response.name + " (" + moment().format('L') + ")";
      forecastIcon.src = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
      temperature.textContent = "Temperature: " + response.main.temp + "°F";
      humidity.textContent = "Humidity: " + response.main.humidity + "%";
      windSpeed.textContent = "Wind Speed: " + response.wind.speed + " MPH";
      cityUvIndex(response.coord.lat, response.coord.lon);
      fiveDayForecast(response.coord.lat, response.coord.lon);
    });
  }

  //API for the UV Index data for the searched city.
  function cityUvIndex(lat, lon) {
    var query = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
    $.ajax({
      url: query,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      uvIndex.textContent = "UV Index: " + response.value;
      uvIndex.classList = "";
      if (response.value < 3) {
        uvIndex.classList.add("favorable");
      }
      else if (response.value < 6) {
        uvIndex.classList.add("moderate");
      }
      else {
        uvIndex.classList.add("severe");
      }
    });
  }


});