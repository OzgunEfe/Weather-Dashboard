var apiKey = '869340399bd2cd397673477060de7d0b';
var city = 'London';
var baseUrl = "https://api.openweathermap.org/data/2.5/";
var currentUrl = baseUrl + `weather?appid=${apiKey}&units=metric&`;
var forecastUrl = baseUrl + `forecast?appid=${apiKey}&units=metric&`;
var iconUrl = 'https://openweathermap.org/img/w/';





function inputSubmitted(cityName) {
    $.get(currentUrl + `q=${cityName}`)
        .then(function(currentData) {
            console.log(`
                Temp: ${Math.round(currentData.main.temp)},
                Humidity: ${currentData.main.humidity},
                Wind: ${currentData.wind.speed},
                IconUrl: ${iconUrl + currentData.weather[0].icon}.png
            `);

            $.get(forecastUrl + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`)
                .then(function(forecastData) {
                    for (var castObj of forecastData.list) {
                        console.log(`${iconUrl + castObj.weather[0].icon}.png`)
                    }
                });
        });
};

inputSubmitted(city);

