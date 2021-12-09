let btn = document.getElementById("btn");
let input = document.getElementById("input");
let cityName = "";
let weatherData;
let iconLink = `http://openweathermap.org/img/wn/10d@2x.png`;

btn.addEventListener("click", clickHandler);
let weather = {
  apiKey: "c966d7987df25388c1c4d2fac2ce0ee4",
};

function clickHandler() {
  cityName = input.value;
  fetchWeather(cityName);
}

function fetchWeather(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weather.apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      weatherData = data;
      displayWeather();
      if (data.cod == 404) {
        console.log(data.message);
      }
    })
    .catch((e) => console.log("here", e));
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
}
