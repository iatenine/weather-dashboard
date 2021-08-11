const apiKey = "c1ecab3291362f3fe61c8735f3bd9de6";

console.log("Hello world");

$(document).ready(function () {
  $("#submit").click(function (e) {
    e.preventDefault();
    const city = $("#city").val();
    console.log("click", city);
  });
});

const getWeather = async (city) => {};
