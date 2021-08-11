const apiKey = "c1ecab3291362f3fe61c8735f3bd9de6";

function handleWeatherRes(response) {
  console.log("handling response: ", response);
}

// Respond to button click
$(document).ready(function () {
  $("#submit").click(function (e) {
    e.preventDefault();
    const city = $("#city").val();
    getWeather(city);
  });
});

const getWeather = async (city) => {
  const settings = {
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`,
    method: "GET",
    timeout: 0,
    error: function () {
      console.error("Error, double check the city name entered and try again");
    },
  };

  $.ajax(settings).done(function (response) {
    handleWeatherRes(response);
  });
};
