This application utilizes multiple APIs from the Open Weather website. Through the use of the responses from these APIs, we can manipulate the information that is displayed on the front-end of the page. For this assignment, I traversed the DOM to find the data points for temperature, humidity, wind speed, and UV index. The open weather APIs allow you to input a city and receive the live information for that location. WIth this data, I used the textContent method to display the values on the application. I also created a few function that allowed the application to access the local storage and track the previously searched cities. With this information, we are able to click on a list of previously searched cities and go to that city. By default, the last searched city will persist when the page is refreshed. At the bottom of the page there is also a 5-day forecast section that displays the forecast of the searched city over the next 5 days. This data is also accessed by using another open weather API. The current weather as well as the 5 day forecast contain an icon from the open weather APIs that display the current weather conditions. The UV index auto highlights red for severe conditions, yellow for moderate conditions, and green for favorable conditions. 

![screenshot](https://github.com/jhuynh24/api_weather_dashboard/blob/main/assets/weather%20dashboard.PNG)