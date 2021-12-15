let btn = document.getElementById("btn");
let input = document.getElementById("autocomplete");
let cityName;
let weatherData;
let iconLink = `http://openweathermap.org/img/wn/10d@2x.png`;
let apiCallLink;
let mapApiKey = `AIzaSyAAeSk1fK5LRIF6KCWw33M3TitfzAfzQUA`;

//event Listeners
btn.addEventListener("click", clickHandler);
input.addEventListener("keyup", enterListner);
input.addEventListener("input", () => fetchCity(input.value));

let weather = {
  apiKey: "c966d7987df25388c1c4d2fac2ce0ee4",
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

function successCallback(position) {
  console.log("position:", position);

  let { latitude, longitude } = position.coords;

  apiCallLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weather.apiKey}`;

  fetchWeather(apiCallLink);
}

function errorCallback(error) {
  console.log("error:", error);
}

document.getElementById("body").onload = defaultCity();

function defaultCity() {
  cityName = `mumbai`;

  apiCallLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weather.apiKey}`;

  fetchWeather(apiCallLink);
}

function clickHandler() {
  cityName = input.value;

  apiCallLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weather.apiKey}`;
  console.log("apiCallLink:", apiCallLink);

  fetchWeather(apiCallLink);
}

function fetchWeather() {
  console.log(apiCallLink);
  fetch(apiCallLink)
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
  } else {
    document.querySelector("#coffee").innerText = ``;
  }
}

function errorHandler() {
  let description = document.querySelector("#description");

  description.innerText = `${weatherData.message}`;

  description.style.color = `#cf6679`;
}

function enterListner(event) {
  if (event.key == `Enter`) {
    clickHandler();
  }
}

async function fetchCity(searchText) {
  let cities;
  await fetch("/data/cities.json")
    .then((res) => res.json())
    .then((json) => {
      cities = json;
    });

  //get matches to the current text input
  let matches = cities.filter((cities) => {
    const regex = new RegExp(`^${searchText}`, "gi");

    return cities.City.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
  }

  outputSuggestions(matches);
}

fetchCity();

function outputSuggestions(matches) {
  const html = matches
    .map(
      (match) =>
        ` <div class="suggestions">
      <h4>${match.City}</h4>
      <small>${match.District} </small>
      </div>`
    )
    .join("");

  document.getElementById("outputSuggestions").innerHTML = html;
  // console.log("html:", html);

  let suggestionsDivs = document.querySelectorAll(".suggestions");

  setSuggestions(suggestionsDivs);
}

// const width = document.getElementById("mainDiv").getBoundingClientRect();
// console.log("width:", width);

function setSuggestions(suggestionDivs) {
  // console.log(suggestionDivs.length);

  for (i = 0; i < suggestionDivs.length - 1; i++) {
    suggestionDivs[i].addEventListener("click", (e) => {
      let result = e.currentTarget.innerText;
      console.log("result:", result);
      result = result.split("\n");
      console.log("result:", result);
      input.value = result[0];
    });
  }
}
