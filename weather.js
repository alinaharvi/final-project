let now = new Date();
let h3 = document.querySelector("h3");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesdey",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h3.innerHTML = `${day}`;
let times = document.querySelector("#localTime");
let hours = now.getHours();
let minutes = now.getMinutes();
times.innerHTML = `${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let days = ["Mon", "Thu", "Wed", "Thu"];
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
          <img class="icons-forecast" src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" width="15" />
          <div class="max-min">
            <span class="day-max">${Math.round(forecastDay.temp.max)}°</span>
            <span class="day-min">${Math.round(forecastDay.temp.min)}°</span>
          </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "b633401dd2448b7cb3d3f72a8fcfd993";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=b633401dd2448b7cb3d3f72a8fcfd993&units=metric`;
  axios.get(url).then(showTemperature);
}

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = `b633401dd2448b7cb3d3f72a8fcfd993`;
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
}

function showTemperature(response) {
  let celciumTemp = Math.round(response.data.main.temp);
  let temElement = document.querySelector(".tem");
  temElement.innerHTML = `${celciumTemp}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.main.humidity}`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  cTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temElement = document.querySelector(".tem");
  let fahrTemp = (cTemp * 9) / 5 + 32;
  temElement.innerHTML = Math.round(fahrTemp);
  celcLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelcium(event) {
  event.preventDefault();
  let celciumElement = document.querySelector(".tem");
  celciumElement.innerHTML = Math.round(cTemp);
  celcLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let form = document.querySelector("#citySearch");
form.addEventListener("submit", enterCity);

let cTemp = null;

let fahrenheitLink = document.querySelector("#fahr");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celcLink = document.querySelector("#celcium-link");
celcLink.addEventListener("click", showCelcium);

enterCity("New York");
