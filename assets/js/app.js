var apiKey = "869340399bd2cd397673477060de7d0b";
var baseUrl = "https://api.openweathermap.org/data/2.5/";
var currentUrl = baseUrl + `weather?appid=${apiKey}&units=metric&`;
var forecastUrl = baseUrl + `forecast?appid=${apiKey}&units=metric&`;
var iconUrl = "https://openweathermap.org/img/w/";
var currentDate = moment().format("DD/MM/YYYY");

cityNamesArray = JSON.parse(localStorage.getItem("forecast")) || [];

// This function gets the forecast data and shows it on the screen.
function getDailyForecast(cityName) {
  $(".daily-forecast").html("");
  $.get(currentUrl + `q=${cityName}`).then(function (currentData) {
    $(".daily-forecast").removeClass("hide");
    $(".daily-forecast").append(`
                  <div class="forecast-header-section">
                      <h2>${cityName} (${currentDate})</h2>
                      <img src="${
                        iconUrl + currentData.weather[0].icon
                      }.png" alt="weather-icon" width="45px" height="45px">
                  </div>
                      <p>Temp: ${Math.round(currentData.main.temp)}°C</p>
                      <p>Wind: ${currentData.wind.speed} KPH</p>
                      <p id="daily-forecast-last-item">Humidity: ${
                        currentData.main.humidity
                      }%</p>
        `);

    $(".fiveDayForevastTitle").removeClass("hide");
    getWeeklyForecast(currentData);
  }).catch(function() {
    $(".daily-forecast").addClass("hide");
    $(".forecast-boxes").addClass("hide");
    $(".fiveDayForevastTitle").addClass("hide");
    setTimeout(cityNotFound, 50) ;
  });
}

// This function shows an alert if the city is not found.
function cityNotFound() {
    alert("City not found!")
};

// This function shows 5 Days forecast section.
function getWeeklyForecast(currentData) {
  $(".fiveDays-forecast").html("");
  $.get(
    forecastUrl + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`
  ).then(function (forecastData) {
    for (var castObj of forecastData.list) {
      var date = moment(castObj.dt_txt.split(" ")[0]).format("DD/MM/YYYY");

      if (castObj.dt_txt.split(" ")[1] === "09:00:00") {
        $(".fiveDays-forecast").append(`
                    <div class="forecast-boxes">
                        <h4>${date}</h4>
                        <img src="${
                          iconUrl + castObj.weather[0].icon
                        }.png" width="35px" height="35px" alt="weather-icon">
                        <p>Temp: ${Math.round(castObj.main.temp)}°C</p>
                        <p>Wind: ${castObj.wind.speed} KPH</p>
                        <p>Humidity: ${castObj.main.humidity}%</p>
                    </div>
                `);
      }
    }
  });
}

// This function saves the city names to LocalStorage.
function saveTasks(arr) {
  localStorage.setItem("forecast", JSON.stringify(arr));
}

// This function creates a button for each searched city.
function displayHistory() {
  $(".historyCityName").html("");
  $(".historyCityName").removeClass("hide");
  cityNamesArray.forEach(function (city) {
    $(".historyCityName").append(`
        <button class="btn cityNameButtons">${city}</button>
    `);
  });
}

displayHistory();

// This function gets the city name from the input and runs the forecast function.
$(".searchBtn").click(function () {
  var inputValue = $("#searchInput")
    .val()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");

  getDailyForecast(inputValue);
  $("#searchInput").val("");


  if (!cityNamesArray.includes(inputValue) && inputValue != "") {
        cityNamesArray.push(inputValue);
        saveTasks(cityNamesArray);
    };

  displayHistory();

  historyButtons();
});

// This function shows the previously searched cities.
function historyButtons(){
    $(".cityNameButtons").on("click", function(event) {
        var inputValue = $(this).text()
        getDailyForecast(inputValue);
    });
}

historyButtons();




// console.log(`
// Temp: ${Math.round(currentData.main.temp)},
// Humidity: ${currentData.main.humidity},
// Wind: ${currentData.wind.speed},
// IconUrl: ${iconUrl + currentData.weather[0].icon}.png
// `);
