let btn = document.getElementById("btn");
let input = document.getElementById("input");
let cityName;
let weatherData;
let iconLink = `http://openweathermap.org/img/wn/10d@2x.png`;

btn.addEventListener("click", clickHandler);
let weather = {
  apiKey: "c966d7987df25388c1c4d2fac2ce0ee4",
};

document.getElementById("body").onload = defaultCity();

function defaultCity() {
  cityName = `mumbai`;
  fetchWeather();
}

function clickHandler() {
  cityName = input.value;
  fetchWeather();
}

function fetchWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weather.apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      weatherData = data;

      if (data.cod == 404 || data.cod == 400) {
        // console.log(data.message);
        errorHandler();
      } else {
        displayWeather();
      }
    })
    .catch((e) => console.log("error occured", e));
}

function displayWeather() {
  let { name } = weatherData;
  let { temp, humidity } = weatherData.main;
  let { icon, description } = weatherData.weather[0];

  iconLink = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  document.querySelector("#iconImage").src = iconLink;

  document.querySelector("#temperature").innerText = `${temp}°C`;

  document.querySelector("#currentCity").innerText = `${name}`;

  document.querySelector("#description").innerText = `${description}`;

  document.querySelector("#description").style.color = `#ffffff`;

  if (
    name == "Bhilai" ||
    name == "Rajnandgaon" ||
    name == "Raipur" ||
    name == "Durg"
  ) {
    document.querySelector(
      "#coffee"
    ).innerText = ` Hey there if you are from ${name} we can Grab some Coffee Sometime,
    I would love to meet you`;
  }
}

function errorHandler() {
  let description = document.querySelector("#description");

  description.innerText = `${weatherData.message}`;

  description.style.color = `#cf6679`;
}
