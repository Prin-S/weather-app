import './styles.css';

const weatherSubmit = document.querySelector('#weather-form');
weatherSubmit.addEventListener('submit', getWeather);

function getWeather(event) {
    const visualCrossingAPI = document.querySelector('#visual-crossing-api'); // This project is front end only, so the API needs to be entered here since no .env is used.
    const location = document.querySelector('#location');
    const unit = document.querySelector('input[name=unit]:checked');

    const message = document.querySelector('#message');

    let selectedWeather = {};
    let degreeText = '';
    let rainText = '';
    let tempToC = 0;
    let feelsLikeToC = 0;

    const wrapper = document.querySelector('.wrapper');
    wrapper.style.display = 'none';

    const box1 = document.querySelector('#box1');
    const box3 = document.querySelector('#box3');
    const box5 = document.querySelector('#box5');

    const box1Text = document.querySelector('#box1-text');
    const box2Text = document.querySelector('#box2-text');
    const box3Text = document.querySelector('#box3-text');
    const box4Text = document.querySelector('#box4-text');
    const box5Text = document.querySelector('#box5-text');
    const box6Text = document.querySelector('#box6-text');

    if (unit.value == 'metric') {
        degreeText = '°C';
        rainText = 'mm';
    } else {
        degreeText = '°F';
        rainText = 'in';
    }

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.value}?unitGroup=${unit.value}&key=${visualCrossingAPI.value}`, {mode: 'cors'})
        .finally(function() {
            message.innerHTML = 'Loading...';
        })
        .then(function(response) {
            return response.json();
        })
        .catch(function(err) {
            message.innerHTML = 'Location not found / Incorrect API key';
            console.log(err);
        })
        .then(function(response) {
            message.innerHTML = '';

            selectedWeather = {
                location: response.resolvedAddress,
                temp: response.currentConditions.temp,
                conditions: response.currentConditions.conditions,
                humidity: response.currentConditions.humidity,
                feelsLike: response.currentConditions.feelslike,
                rain: response.currentConditions.precip,
                rainProb: response.currentConditions.precipprob,
                weatherDesc: response.description,
            };

            if (degreeText == '°F') { // Convert °F to °C for changing box color.
                tempToC = (selectedWeather.temp - 32) * 5 / 9;
                feelsLikeToC = (selectedWeather.feelsLike - 32) * 5 / 9;
            } else {
                tempToC = selectedWeather.temp;
                feelsLikeToC = selectedWeather.feelsLike;
            }

            wrapper.style.display = 'grid';
            
            box1.classList.remove('temp-below0', 'temp-0-9', 'temp-10-19', 'temp-20-29', 'temp-30-39', 'temp-40plus');
            box3.classList.remove('temp-below0', 'temp-0-9', 'temp-10-19', 'temp-20-29', 'temp-30-39', 'temp-40plus');
            box5.classList.remove('no-rain', 'light-rain', 'moderate-rain', 'heavy-rain');

            if (tempToC < 0) { // Change box color for temperature.
                box1.classList.add('temp-below0');
            } else if (tempToC < 10) {
                box1.classList.add('temp-0-9');
            } else if (tempToC < 20) {
                box1.classList.add('temp-10-19');
            } else if (tempToC < 30) {
                box1.classList.add('temp-20-29');
            } else if (tempToC < 40) {
                box1.classList.add('temp-30-39');
            } else {
                box1.classList.add('temp-40plus');
            }

            if (feelsLikeToC < 0) { // Change box color for 'feels like' temperature.
                box3.classList.add('temp-below0');
            } else if (feelsLikeToC < 10) {
                box3.classList.add('temp-0-9');
            } else if (feelsLikeToC < 20) {
                box3.classList.add('temp-10-19');
            } else if (feelsLikeToC < 30) {
                box3.classList.add('temp-20-29');
            } else if (feelsLikeToC < 40) {
                box3.classList.add('temp-30-39');
            } else {
                box3.classList.add('temp-40plus');
            }

            if (selectedWeather.rainProb <= 25) { // Change box color for change of rain.
                box5.classList.add('no-rain');
            } else if (selectedWeather.rainProb <= 50) {
                box5.classList.add('light-rain');
            } else if (selectedWeather.rainProb <= 75) {
                box5.classList.add('moderate-rain');
            } else {
                box5.classList.add('heavy-rain');
            }

            box1Text.innerHTML = `<div><p>${selectedWeather.location}</p><h2>${selectedWeather.temp}${degreeText}</h2><p>${selectedWeather.conditions}</p></div>`;
            box2Text.innerHTML = `<h3>${selectedWeather.humidity}%</h3>`;
            box3Text.innerHTML = `<h3>${selectedWeather.feelsLike}${degreeText}</h3>`;
            box4Text.innerHTML = `<h3>${selectedWeather.rain} ${rainText}</h3>`;
            box5Text.innerHTML = `<h3>${selectedWeather.rainProb}%</h3>`;
            box6Text.innerHTML = `<p>${selectedWeather.weatherDesc}</p>`;
        })
        .catch(function(err) {
            message.innerHTML = 'Location not found';
            console.log(err);
        });

    event.preventDefault();
}