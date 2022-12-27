var apiKey = '869340399bd2cd397673477060de7d0b';
var city = 'London';
var baseUrl = "https://api.openweathermap.org/data/2.5/";
var currentUrl = baseUrl + `weather?appid=${apiKey}&units=metric&`;
var forecastUrl = baseUrl + `forecast?appid=${apiKey}&units=metric&`;
var iconUrl = 'https://openweathermap.org/img/w/';
var currentDate = moment().format("DD/MM/YYYY");

console.log(currentDate);


function inputSubmitted(cityName) {
    $.get(currentUrl + `q=${cityName}`)
        .then(function(currentData) {
            $('.daily-forecast').removeClass("hide");
            $('.daily-forecast').append(`
                <div class="forecast-header-section">
                    <h2>${cityName} (${currentDate})</h2>
                    <img src="${iconUrl + currentData.weather[0].icon}.png" alt="weather-icon" width="45px" height="45px">
                </div>
                    <p>Temp: ${Math.round(currentData.main.temp)}°C</p>
                    <p>Wind: ${currentData.wind.speed} KPH</p>
                    <p id="daily-forecast-last-item">Humidity: ${currentData.main.humidity}%</p>
            `);

            $('.fiveDayForevastTitle').removeClass("hide");
            $.get(forecastUrl + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`)
                .then(function(forecastData) {
                    console.log(forecastData);
                    for (var castObj of forecastData.list) {

                        var date = moment(castObj.dt_txt.split(' ')[0]).format("DD/MM/YYYY");

                        if(castObj.dt_txt.split(' ')[1] === "09:00:00") {
                            $('.fiveDays-forecast').append(`
                            <div class="forecast-boxes">
                                <h4>${date}</h4>
                                <img src="${iconUrl + castObj.weather[0].icon}.png" width="35px" height="35px" alt="weather-icon">
                                <p>Temp: ${Math.round(castObj.main.temp)}°C</p>
                                <p>Wind: ${castObj.wind.speed} KPH</p>
                                <p>Humidity: ${castObj.main.humidity}%</p>
                            </div>
                            `);
                        };

                    };

                    if(forecastData.cod == '200'){
                        $('.historyCityName').removeClass("hide");
                        $('.historyCityName').append(`
                            <button class="btn">${cityName}</button>
                        `);
                    }
                });
        });
};

function showHistory(){
    $('.historyCityName').removeClass("hide");
    $('.historyCityName').append(`
        <button class="btn">${cityName}</button>
    `)
};


$('.searchBtn').click(function() {
    var inputValue = $('#searchInput').val().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');;

    if(!inputValue){
        alert("Please enter a city name!");
    }

    inputSubmitted(inputValue);

    $('#searchInput').val('');
});


// console.log(`
// Temp: ${Math.round(currentData.main.temp)},
// Humidity: ${currentData.main.humidity},
// Wind: ${currentData.wind.speed},
// IconUrl: ${iconUrl + currentData.weather[0].icon}.png
// `);



{/* <div class="forecast-boxes ">
<h4>18/12/2022</h4>
<img src="./assets/icons/cloud.png" width="20px" height="20px" alt="weather-icon">
<p>Temp: 1°C</p>
<p>Wind: 3.48 kph</p>
<p>Humidity: 65%</p>
</div> */}