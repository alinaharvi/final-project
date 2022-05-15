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
  console.log(searchInput.value);
  let apiKey = "b633401dd2448b7cb3d3f72a8fcfd993";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=b633401dd2448b7cb3d3f72a8fcfd993&units=metric`;

  axios.get(url).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}°`;
}

let form = document.querySelector("#citySearch");
form.addEventListener("submit", enterCity);
