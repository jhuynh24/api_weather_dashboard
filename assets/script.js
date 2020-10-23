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

  // Callbacks for the functions to execute.
  populateSearch();
  defaultCity();

  //Code for the search bar functionality and local storage persistance
  searchButton.addEventListener("click", function () {
    var cityName = document.getElementById("city").value;
    console.log(cityName);
    cityWeather(cityName);
    document.getElementById("city").value = "";
    var searchHistory = localStorage.getItem('searchHistory') || '[]';
    var listOfSearchHistory = [...JSON.parse(searchHistory), cityName];
    localStorage.setItem("searchHistory", JSON.stringify(listOfSearchHistory));
    populateSearch();
  });


  //Code for population of the search history by accessing local storage.
  function populateSearch() {
    var searchHistory = localStorage.getItem('searchHistory') || '[]';
    var listOfSearchHistory = [...JSON.parse(searchHistory)];
    document.getElementById("city").value = "";
    searchResults.innerHTML = "";
    for (var i = listOfSearchHistory.length - 1; i >= 0; i--) {
      var listElement = document.createElement("li");
      var clickableElement = document.createElement("a");
      clickableElement.href = "#";
      clickableElement.textContent = listOfSearchHistory[i];
      searchResults.appendChild(listElement);
      listElement.appendChild(clickableElement);
      clickableElement.onclick = search;
    }
  }


  //Code for keeping the last city searched on the page after updating.
  function defaultCity() {
    var searchHistory = localStorage.getItem('searchHistory') || '[]';
    var listOfSearchHistory = [...JSON.parse(searchHistory)];
    lastSearch = listOfSearchHistory[listOfSearchHistory.length - 1];
    cityWeather(lastSearch);
  }


  //Adds the text to the front-end of the document for the search history.
  function search() {
    var cityName = this.textContent;
    cityWeather(cityName);
    var searchHistory = localStorage.getItem('searchHistory') || '[]';
    var listOfSearchHistory = [...JSON.parse(searchHistory), cityName];
    localStorage.setItem("searchHistory", JSON.stringify(listOfSearchHistory));
    populateSearch();
  }


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
      } else if (response.value < 6) {
        uvIndex.classList.add("moderate");
      } else {
        uvIndex.classList.add("severe");
      }
    });
  }


  //API for the 5-day forecast.
  function fiveDayForecast(lat, lon) {
    var query = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
    $.ajax({
      url: query,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      forecastHeader.classList.remove("hide");
      day1.classList.remove("hide");
      day2.classList.remove("hide");
      day3.classList.remove("hide");
      day4.classList.remove("hide");
      day5.classList.remove("hide");
      date1.textContent = moment().add(1, 'days').format('L');
      date2.textContent = moment().add(2, 'days').format('L');
      date3.textContent = moment().add(3, 'days').format('L');
      date4.textContent = moment().add(4, 'days').format('L');
      date5.textContent = moment().add(5, 'days').format('L');
      icon1.src = "http://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + "@2x.png";
      icon2.src = "http://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + "@2x.png";
      icon3.src = "http://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + "@2x.png";
      icon4.src = "http://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + "@2x.png";
      icon5.src = "http://openweathermap.org/img/wn/" + response.daily[5].weather[0].icon + "@2x.png";
      temp1.textContent = "Temp: " + response.daily[1].temp.day + "°F";
      temp2.textContent = "Temp: " + response.daily[2].temp.day + "°F";
      temp3.textContent = "Temp: " + response.daily[3].temp.day + "°F";
      temp4.textContent = "Temp: " + response.daily[4].temp.day + "°F";
      temp5.textContent = "Temp: " + response.daily[5].temp.day + "°F";
      hum1.textContent = "Humidity " + response.daily[1].humidity + "%";
      hum2.textContent = "Humidity " + response.daily[2].humidity + "%";
      hum3.textContent = "Humidity " + response.daily[3].humidity + "%";
      hum4.textContent = "Humidity " + response.daily[4].humidity + "%";
      hum5.textContent = "Humidity " + response.daily[5].humidity + "%";
    });
  }

});