// Initialize the page
$(document).ready(() => {
  const submitButton = $("#submit");
  const clearButton = $("#clear");

  // Add event listeners to radio buttons
  $("#celsius").click(() => (units = "metric"));
  $("#fahrenheit").click(() => (units = "imperial"));

  submitButton.click(() => getLatLon($("#city").val()));
  clearButton.click(() => clearHistory());

  getHistory();
  searchHistory.forEach((city) => {
    clearButton.removeClass("disabled");
    addCityButton(city);
  });

  $("#city").autocomplete({
    source: cityList.concat(searchHistory),
  });
  enterDefaults();
});
