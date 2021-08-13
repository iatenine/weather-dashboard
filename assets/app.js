const apiKey = "c1ecab3291362f3fe61c8735f3bd9de6";
const units = "imperial";
const searchHistory = [];
const iconPathPrefix = "https://openweathermap.org/img/wn/";
const iconPathSuffix = "@2x.png";
var mainCard;

function enterDefaults() {
  const mainCard = $("#main-weather-card");
  const forecastCards = $("#forecast-container");
  let newHtml = "";

  mainCard.html(`<h2 class="header">Enter a City</h2>
                <hr />
                <img class="icon" src=''></img>
                <h3 class="description"></h3>
                <h3 class="temp">Temp: --</h3>
                <h3 class="humidity">Humidity: --</h3>
                <h3><span class="uvi">UV Index: --</span></h3>`);

  for (let x = 1; x <= 5; x += 1) {
    newHtml += `<div id="day-${x}" class="card bg-primary flex-grow-1 day-card">
       <h3 class="date">Date</h3>
       <hr />
       <img class="icon" src=""></img>
       <h4 class="description">Desc: --</h4>
       <h4 class="temp">Temp: --</h4>
       <h4 class="wind">Wind: --</h4>
       <h4 class="humidity">Humidity: --</h4>
     </div>`;
  }
  forecastCards.html(newHtml);
}

function handleWeatherData(response) {
  const forecast = [];
  const forecastCards = [];
  const currSummObj = createWeatherSummaryObject(response.current);
  let uvColor;

  console.log("id: ", currSummObj.icon);
  console.log("curr summ obj: ", currSummObj.description);

  for (let i = 0; i < 5; i += 1) {
    const day = response.daily[i];
    const daySummary = createWeatherSummaryObject(day);
    const dayCardId = "day-" + parseInt(i + 1);
    const dayCard = $("#forecast-container").find(`#${dayCardId}`);
    forecastCards.push(dayCard);
    forecast.push(daySummary);
  }

  console.log("uvi is: ", response.current.uvi);
  if (response.current.uvi <= 2) {
    uvColor = "green";
  } else if (response.current.uvi <= 5) {
    uvColor = "yellow";
  } else if (response.current.uvi <= 7) {
    uvColor = "orange";
  } else if (response.current.uvi <= 10) {
    uvColor = "red";
  }

  mainCard
    .find(".icon")
    .prop("src", iconPathPrefix + currSummObj.icon + iconPathSuffix);
  mainCard.find(".description").text(currSummObj.description);
  mainCard.find(".temp").text("Temp: " + currSummObj.temp);
  mainCard.find(".humidity").text("Humidity: " + currSummObj.humidity);
  mainCard.find(".uvi").text("UV Index: " + currSummObj.uvi);
  mainCard.find(".uvi").css("background-color", uvColor);

  for (let i = 0; i < forecast.length; i += 1) {
    const dayCard = forecastCards[i];
    const daySummary = forecast[i];

    dayCard
      .find(".icon")
      .prop("src", iconPathPrefix + daySummary.icon + iconPathSuffix);
    dayCard.find(".description").text(daySummary.description);
    dayCard.find(".date").text(daySummary.date);
    dayCard.find(".temp").text("Temp: " + daySummary.temp);
    dayCard.find(".wind").text("Wind Speed: " + daySummary.windSpeed);
    dayCard.find(".humidity").text("Humidity: " + daySummary.humidity);
  }
}

// Respond to button click
$(document).ready(function () {
  $("#submit").click(function (e) {
    e.preventDefault();
    const city = $("#city").val();
    getLatLon(city);
  });

  searchHistory.forEach(function (city, index) {
    addCityButton(city);
  });

  mainCard = $("#main-weather-card");
  enterDefaults();
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
  retObj["icon"] = daysWeather.weather[0].icon;
  retObj["description"] = daysWeather.weather[0].description;
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
  addCityButton(newCity);
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

// Add a button to the list of cities
function addCityButton(city) {
  const button = $("<button>").text(city);
  button.click(function (e) {
    e.preventDefault();

    // Fill in the city name
    $("#city").val(city);
    $("#submit").click();
  });
  button.addClass("btn btn-secondary mb-1");
  $("#city-list").append(button);
}

getHistory();
