import './styles.css';

const visualCrossingAPI = document.querySelector('#visual-crossing-api');
const location = document.querySelector('#location');

const weatherSubmit = document.querySelector('#weather-form');
weatherSubmit.addEventListener('submit', getWeather);

const message = document.querySelector('#message');

function getWeather(event) {
    const unit = document.querySelector('input[name=unit]:checked');
    message.innerHTML = '';

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.value}?unitGroup=${unit.value}&key=${visualCrossingAPI.value}`, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .catch(function(err) {
            message.innerHTML = err;
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(err) {
            console.log(err);
        })

    event.preventDefault();
}

console.log('Hello! Hello!');