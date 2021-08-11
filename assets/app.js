const apiKey = "c1ecab3291362f3fe61c8735f3bd9de6";
const units = "imperial";

function handleWeatherData(response) {
  console.log("Current Weather: ", response);
  // Need to grab: UVI, Temperature, Humidity, Wind Speed
  const uvi = response.current.uvi;
  const temperature = response.current.temp;
  const humidity = response.current.humidity;
  const windSpeed = response.current.wind_speed;

  console.log("UVI: ", uvi);
  console.log("Temperature: ", temperature);
  console.log("Humidity: ", humidity);
  console.log("Wind Speed: ", windSpeed);
}

// Respond to button click
$(document).ready(function () {
  $("#submit").click(function (e) {
    e.preventDefault();
    const city = $("#city").val();
    getLatLon(city);
  });
});

// Convert a city name to a latitude and longitude
const getLatLon = async (city) => {
  const settings = {
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`,
    method: "GET",
    timeout: 0,
    error: function () {
      console.error("Error, double check the city name entered and try again");
    },
  };

  $.ajax(settings).done(function (response) {
    const lat = response.city.coord.lat;
    const lon = response.city.coord.lon;
    getCurrentWeather(lat, lon);
  });
};

// Fetch current weather data from onecall
const getCurrentWeather = async (lat, lon) => {
  var settings = {
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=${units}&appId=${apiKey}`,
    method: "GET",
    timeout: 0,
    error: function () {
      console.error("Error, double check the city name entered and try again");
    },
  };

  $.ajax(settings).done(function (response) {
    handleWeatherData(response);
  });
};
