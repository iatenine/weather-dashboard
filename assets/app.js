const apiKey = "c1ecab3291362f3fe61c8735f3bd9de6";
const units = "imperial";
const searchHistory = [];
var mainCard;

function handleWeatherData(response) {
  console.log("Full ressponse: ", response);
  const forecast = [];
  const forecastCards = [];
  const currSummObj = createWeatherSummaryObject(response.current);

  for (let i = 0; i < 5; i += 1) {
    const day = response.daily[i];
    const daySummary = createWeatherSummaryObject(day);
    const dayCardId = "day-" + parseInt(i + 1);
    const dayCard = $("#forecast-container").find(`#${dayCardId}`);
    forecastCards.push(dayCard);
    forecast.push(daySummary);
  }

  mainCard.find(".temp").text("Temp: " + currSummObj.temp);
  mainCard.find(".humidity").text("Humidity: " + currSummObj.humidity);
  mainCard.find(".uvi").text("UV Index: " + currSummObj.uvi);

  for (let i = 0; i < forecast.length; i += 1) {
    const dayCard = forecastCards[i];
    const daySummary = forecast[i];

    dayCard.find(".date").text(daySummary.date);
    dayCard.find(".temp").text("Temp: " + daySummary.temp);
    dayCard.find(".wind").text("Wind Speed: " + daySummary.windSpeed);
    dayCard.find(".humidity").text("Humidity: " + daySummary.humidity);
  }

  console.log("current weather: ", currSummObj);
  console.log("forecast: ", forecast);
}

// Respond to button click
$(document).ready(function () {
  $("#submit").click(function (e) {
    e.preventDefault();
    const city = $("#city").val();
    getLatLon(city);
  });

  mainCard = $("#main-weather-card");
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
    console.log("adding to history presumably...");
    mainCard
      .find(".header")
      .text(city + " (" + new Date().toDateString() + ")");
    addToHistory(city);
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

// Return an object with temp, humidity, windSpeed and uvi
function createWeatherSummaryObject(daysWeather) {
  const retObj = {};
  const date = new Date(daysWeather.dt * 1000);
  retObj["date"] = date.toDateString();
  retObj["temp"] = daysWeather.temp;
  retObj["humidity"] = daysWeather.humidity;
  retObj["windSpeed"] = daysWeather.wind_speed;
  retObj["uvi"] = daysWeather.uvi;
  if (typeof retObj["temp"] === "object") {
    const avgTemp = (retObj["temp"].min + retObj["temp"].max) / 2;
    retObj["temp"] = parseFloat(avgTemp.toFixed(2));
  }
  return retObj;
}

// Add a city to the search history and localStorage
function addToHistory(newCity) {
  if (searchHistory.includes(newCity)) return;
  searchHistory.push(newCity);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// Get all cities from localStorage
function getHistory() {
  const history = JSON.parse(localStorage.getItem("searchHistory"));
  history.forEach(function (city) {
    searchHistory.push(city);
  });
}

getHistory();
