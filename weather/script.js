const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const error = document.querySelector(".weather-error");

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=19b49def7b99621ed575529c92f7ba37&units=metric`;
 
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === "404") {
    error.textContent = "Error! City not found";
    clearWeather();
  } else if (data.cod === "400") {
    error.textContent = "Error! Enter the city";
    clearWeather();
  } else {
    error.textContent = "";
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Скорость ветра ${data.wind.speed.toFixed(0)} м/с`;
    humidity.textContent = `Влажность ${data.main.humidity.toFixed(0)}%`;
  }
}

function clearWeather() {
  weatherIcon.className = "";
  temperature.textContent = "";
  weatherDescription.textContent = "";
  wind.textContent = "";
  humidity.textContent = "";
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);