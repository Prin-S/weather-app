import './styles.css';

const visualCrossingAPI = document.querySelector('#visual-crossing-api');
const location = document.querySelector('#location');

const weatherSubmit = document.querySelector('#weather-form');
weatherSubmit.addEventListener('submit', getWeather);

const message = document.querySelector('#message');
let selectedWeather = {};

const wrapper = document.querySelector('.wrapper');
const box1 = document.querySelector('#box1-text');
const box2 = document.querySelector('#box2-text');
const box3 = document.querySelector('#box3-text');
const box4 = document.querySelector('#box4-text');
const box5 = document.querySelector('#box5-text');
const box6 = document.querySelector('#box6-text');

function getWeather(event) {
    message.innerHTML = '';
    const unit = document.querySelector('input[name=unit]:checked');
    let degreeText = '';
    let rainText = '';

    if (unit.value == 'metric') {
        degreeText = '°C';
        rainText = 'mm';
    } else {
        degreeText = '°F';
        rainText = 'in';
    }

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.value}?unitGroup=${unit.value}&key=${visualCrossingAPI.value}`, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .catch(function(err) {
            message.innerHTML = 'Location not found';
        })
        .then(function(response) {
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

            wrapper.style.display = 'grid';
            box1.innerHTML = `<div><p>${selectedWeather.location}</p><h2>${selectedWeather.temp}${degreeText}</h2><p>${selectedWeather.conditions}</p></div>`;
            box2.innerHTML = `<h3>${selectedWeather.humidity}%</h3>`;
            box3.innerHTML = `<h3>${selectedWeather.feelsLike}${degreeText}</h3>`;
            box4.innerHTML = `<h3>${selectedWeather.rain} ${rainText}</h3>`;
            box5.innerHTML = `<h3>${selectedWeather.rainProb}%</h3>`;
            box6.innerHTML = `<p>${selectedWeather.weatherDesc}</p>`;
        })
        .catch(function(err) {
            console.log(err);
        });

    event.preventDefault();
}