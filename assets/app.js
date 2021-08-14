const apiKey = "c1ecab3291362f3fe61c8735f3bd9de6";
const units = "imperial";
const searchHistory = [];
const iconPathPrefix = "https://openweathermap.org/img/wn/";
const iconPathSuffix = "@2x.png";
// All US cities with a population greater than 100,000
const cityList = [
  "New York, New York",
  "Los Angeles, California",
  "Chicago, Illinois",
  "Houston, Texas",
  "Philadelphia, Pennsylvania",
  "Phoenix, Arizona",
  "San Antonio, Texas",
  "San Diego, California",
  "Dallas, Texas",
  "San Jose, California",
  "Austin, Texas",
  "Indianapolis, Indiana",
  "Jacksonville, Florida",
  "San Francisco, California",
  "Columbus, Ohio",
  "Charlotte, North Carolina",
  "Fort Worth, Texas",
  "Detroit, Michigan",
  "El Paso, Texas",
  "Memphis, Tennessee",
  "Seattle, Washington",
  "Denver, Colorado",
  "Washington, District of Columbia",
  "Boston, Massachusetts",
  "Nashville-Davidson, Tennessee",
  "Baltimore, Maryland",
  "Oklahoma City, Oklahoma",
  "Louisville/Jefferson County, Kentucky",
  "Portland, Oregon",
  "Las Vegas, Nevada",
  "Milwaukee, Wisconsin",
  "Albuquerque, New Mexico",
  "Tucson, Arizona",
  "Fresno, California",
  "Sacramento, California",
  "Long Beach, California",
  "Kansas City, Missouri",
  "Mesa, Arizona",
  "Virginia Beach, Virginia",
  "Atlanta, Georgia",
  "Colorado Springs, Colorado",
  "Omaha, Nebraska",
  "Raleigh, North Carolina",
  "Miami, Florida",
  "Oakland, California",
  "Minneapolis, Minnesota",
  "Tulsa, Oklahoma",
  "Cleveland, Ohio",
  "Wichita, Kansas",
  "Arlington, Texas",
  "New Orleans, Louisiana",
  "Bakersfield, California",
  "Tampa, Florida",
  "Honolulu, Hawaii",
  "Aurora, Colorado",
  "Anaheim, California",
  "Santa Ana, California",
  "St. Louis, Missouri",
  "Riverside, California",
  "Corpus Christi, Texas",
  "Lexington-Fayette, Kentucky",
  "Pittsburgh, Pennsylvania",
  "Anchorage, Alaska",
  "Stockton, California",
  "Cincinnati, Ohio",
  "St. Paul, Minnesota",
  "Toledo, Ohio",
  "Greensboro, North Carolina",
  "Newark, New Jersey",
  "Plano, Texas",
  "Henderson, Nevada",
  "Lincoln, Nebraska",
  "Buffalo, New York",
  "Jersey City, New Jersey",
  "Chula Vista, California",
  "Fort Wayne, Indiana",
  "Orlando, Florida",
  "St. Petersburg, Florida",
  "Chandler, Arizona",
  "Laredo, Texas",
  "Norfolk, Virginia",
  "Durham, North Carolina",
  "Madison, Wisconsin",
  "Lubbock, Texas",
  "Irvine, California",
  "Winston-Salem, North Carolina",
  "Glendale, Arizona",
  "Garland, Texas",
  "Hialeah, Florida",
  "Reno, Nevada",
  "Chesapeake, Virginia",
  "Gilbert, Arizona",
  "Baton Rouge, Louisiana",
  "Irving, Texas",
  "Scottsdale, Arizona",
  "North Las Vegas, Nevada",
  "Fremont, California",
  "Boise City, Idaho",
  "Richmond, Virginia",
  "San Bernardino, California",
  "Birmingham, Alabama",
  "Spokane, Washington",
  "Rochester, New York",
  "Des Moines, Iowa",
  "Modesto, California",
  "Fayetteville, North Carolina",
  "Tacoma, Washington",
  "Oxnard, California",
  "Fontana, California",
  "Columbus, Georgia",
  "Montgomery, Alabama",
  "Moreno Valley, California",
  "Shreveport, Louisiana",
  "Aurora, Illinois",
  "Yonkers, New York",
  "Akron, Ohio",
  "Huntington Beach, California",
  "Little Rock, Arkansas",
  "Augusta-Richmond County, Georgia",
  "Amarillo, Texas",
  "Glendale, California",
  "Mobile, Alabama",
  "Grand Rapids, Michigan",
  "Salt Lake City, Utah",
  "Tallahassee, Florida",
  "Huntsville, Alabama",
  "Grand Prairie, Texas",
  "Knoxville, Tennessee",
  "Worcester, Massachusetts",
  "Newport News, Virginia",
  "Brownsville, Texas",
  "Overland Park, Kansas",
  "Santa Clarita, California",
  "Providence, Rhode Island",
  "Garden Grove, California",
  "Chattanooga, Tennessee",
  "Oceanside, California",
  "Jackson, Mississippi",
  "Fort Lauderdale, Florida",
  "Santa Rosa, California",
  "Rancho Cucamonga, California",
  "Port St. Lucie, Florida",
  "Tempe, Arizona",
  "Ontario, California",
  "Vancouver, Washington",
  "Cape Coral, Florida",
  "Sioux Falls, South Dakota",
  "Springfield, Missouri",
  "Peoria, Arizona",
  "Pembroke Pines, Florida",
  "Elk Grove, California",
  "Salem, Oregon",
  "Lancaster, California",
  "Corona, California",
  "Eugene, Oregon",
  "Palmdale, California",
  "Salinas, California",
  "Springfield, Massachusetts",
  "Pasadena, Texas",
  "Fort Collins, Colorado",
  "Hayward, California",
  "Pomona, California",
  "Cary, North Carolina",
  "Rockford, Illinois",
  "Alexandria, Virginia",
  "Escondido, California",
  "McKinney, Texas",
  "Kansas City, Kansas",
  "Joliet, Illinois",
  "Sunnyvale, California",
  "Torrance, California",
  "Bridgeport, Connecticut",
  "Lakewood, Colorado",
  "Hollywood, Florida",
  "Paterson, New Jersey",
  "Naperville, Illinois",
  "Syracuse, New York",
  "Mesquite, Texas",
  "Dayton, Ohio",
  "Savannah, Georgia",
  "Clarksville, Tennessee",
  "Orange, California",
  "Pasadena, California",
  "Fullerton, California",
  "Killeen, Texas",
  "Frisco, Texas",
  "Hampton, Virginia",
  "McAllen, Texas",
  "Warren, Michigan",
  "Bellevue, Washington",
  "West Valley City, Utah",
  "Columbia, South Carolina",
  "Olathe, Kansas",
  "Sterling Heights, Michigan",
  "New Haven, Connecticut",
  "Miramar, Florida",
  "Waco, Texas",
  "Thousand Oaks, California",
  "Cedar Rapids, Iowa",
  "Charleston, South Carolina",
  "Visalia, California",
  "Topeka, Kansas",
  "Elizabeth, New Jersey",
  "Gainesville, Florida",
  "Thornton, Colorado",
  "Roseville, California",
  "Carrollton, Texas",
  "Coral Springs, Florida",
  "Stamford, Connecticut",
  "Simi Valley, California",
  "Concord, California",
  "Hartford, Connecticut",
  "Kent, Washington",
  "Lafayette, Louisiana",
  "Midland, Texas",
  "Surprise, Arizona",
  "Denton, Texas",
  "Victorville, California",
  "Evansville, Indiana",
  "Santa Clara, California",
  "Abilene, Texas",
  "Athens-Clarke County, Georgia",
  "Vallejo, California",
  "Allentown, Pennsylvania",
  "Norman, Oklahoma",
  "Beaumont, Texas",
  "Independence, Missouri",
  "Murfreesboro, Tennessee",
  "Ann Arbor, Michigan",
  "Springfield, Illinois",
  "Berkeley, California",
  "Peoria, Illinois",
  "Provo, Utah",
  "El Monte, California",
  "Columbia, Missouri",
  "Lansing, Michigan",
  "Fargo, North Dakota",
  "Downey, California",
  "Costa Mesa, California",
  "Wilmington, North Carolina",
  "Arvada, Colorado",
  "Inglewood, California",
  "Miami Gardens, Florida",
  "Carlsbad, California",
  "Westminster, Colorado",
  "Rochester, Minnesota",
  "Odessa, Texas",
  "Manchester, New Hampshire",
  "Elgin, Illinois",
  "West Jordan, Utah",
  "Round Rock, Texas",
  "Clearwater, Florida",
  "Waterbury, Connecticut",
  "Gresham, Oregon",
  "Fairfield, California",
  "Billings, Montana",
  "Lowell, Massachusetts",
  "San Buenaventura (Ventura), California",
  "Pueblo, Colorado",
  "High Point, North Carolina",
  "West Covina, California",
  "Richmond, California",
  "Murrieta, California",
  "Cambridge, Massachusetts",
  "Antioch, California",
  "Temecula, California",
  "Norwalk, California",
  "Centennial, Colorado",
  "Everett, Washington",
  "Palm Bay, Florida",
  "Wichita Falls, Texas",
  "Green Bay, Wisconsin",
  "Daly City, California",
  "Burbank, California",
  "Richardson, Texas",
  "Pompano Beach, Florida",
  "North Charleston, South Carolina",
  "Broken Arrow, Oklahoma",
  "Boulder, Colorado",
  "West Palm Beach, Florida",
  "Santa Maria, California",
  "El Cajon, California",
  "Davenport, Iowa",
  "Rialto, California",
  "Las Cruces, New Mexico",
  "San Mateo, California",
  "Lewisville, Texas",
  "South Bend, Indiana",
  "Lakeland, Florida",
  "Erie, Pennsylvania",
  "Tyler, Texas",
  "Pearland, Texas",
  "College Station, Texas",
];

var mainCard;

function enterDefaults() {
  const mainCard = $("#main-weather-card");
  const forecastCards = $("#forecast-container");
  let newHtml = "";

  mainCard.html(`<h2 class="header">No City Selected</h2>
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

const setErrorMsg = (msg) => {
  if (!msg) {
    $("#error-msg").css("display", "none");
    return;
  }

  $("#error-msg").text(msg);
  $("#error-msg").css("display", "block");
};

// Convert a city name to a latitude and longitude
const getLatLon = async (city) => {
  const settings = {
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`,
    method: "GET",
    timeout: 0,
    error: function (err) {
      if (err.status === 404) {
        setErrorMsg(`No results found`);
        return;
      }
      setErrorMsg(
        "Something went wrong. Full details printed to browser console"
      );
      console.error(
        "Please inform the software maintainer of this error: ",
        err
      );
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
      if (err.status === 404) {
        setErrorMsg(
          `Lat/Lon values for city invalid. Please inform the software maintainer`
        );
        return;
      }
      setErrorMsg(
        "Something went wrong. Full details printed to browser console"
      );
      console.error(
        "Please inform the software maintainer of this error: ",
        err
      );
    },
  };

  $.ajax(settings).done(function (response) {
    setErrorMsg(null);
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
  $("#clear").removeClass("disabled");
  if (searchHistory.includes(newCity)) return;
  addCityButton(newCity);
  searchHistory.push(newCity);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

function clearHistory() {
  $("#clear").addClass("disabled");
  $("#city-list").empty();
  while (searchHistory.length > 0) {
    searchHistory.pop();
  }
  localStorage.removeItem("searchHistory");
}

// Get all cities from localStorage
function getHistory() {
  const history = JSON.parse(localStorage.getItem("searchHistory"));
  if (!history) return;
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
  button.addClass("btn btn-secondary mb-1 city-btn");
  $("#city-list").append(button);
}

// Initialize the page
$(document).ready(function () {
  const submitButton = $("#submit");
  const clearButton = $("#clear");
  const cityInput = $("#city");
  mainCard = $("#main-weather-card");

  submitButton.click(function (e) {
    e.preventDefault();
    const city = $("#city").val();
    getLatLon(city);
  });

  clearButton.click(function (e) {
    e.preventDefault();
    clearHistory();
  });

  searchHistory.forEach(function (city, index) {
    clearButton.removeClass("disabled");
    addCityButton(city);
  });

  cityInput.autocomplete({
    source: cityList.concat(searchHistory),
  });
  enterDefaults();
});

getHistory();
