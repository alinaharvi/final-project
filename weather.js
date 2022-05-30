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

function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "b633401dd2448b7cb3d3f72a8fcfd993";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=b633401dd2448b7cb3d3f72a8fcfd993&units=metric`;
  axios.get(url).then(showTemperature);
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
