const apiKey = "c1ecab3291362f3fe61c8735f3bd9de6";
const units = "imperial";

function handleForecastData(response) {
  console.log("5-Day Forecast: ", response);
}

function handleWeatherData(response) {
  console.log("Current Weather: ", response);
}

// Respond to button click
$(document).ready(function () {
  $("#submit").click(function (e) {
    e.preventDefault();
    const city = $("#city").val();
    getForecast(city);
    getCurrentWeather(city);
  });
});

const getForecast = async (city) => {
  const settings = {
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`,
    method: "GET",
    timeout: 0,
    error: function () {
      console.error("Error, double check the city name entered and try again");
    },
  };

  $.ajax(settings).done(function (response) {
    handleForecastData(response);
  });
};

const getCurrentWeather = async (city) => {
  var settings = {
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appId=${apiKey}`,
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
