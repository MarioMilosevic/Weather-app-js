let cityInput = document.querySelector(".city");
let day = document.querySelector(".day");
let date_year = document.querySelector(".date");
let time = document.querySelector(".time");
let temperature = document.querySelector(".temperature");
let maxTemp = document.querySelector(".max_temp");
let minTemp = document.querySelector(".min_temp");
let windSpeed = document.querySelector(".wind_speed");
let humidity = document.querySelector(".humidity");
let pressure = document.querySelector(".pressure");
let sunriseTime = document.querySelector(".sunrise_time");
let sunsetTime = document.querySelector(".sunset_time");
let weatherStatus = document.querySelector(".weather_status");
let image = document.querySelector(".image");

cityInput.addEventListener("keyup", showWeather);

function showWeather(e) {
  if (e.keyCode === 13) {
    let city = cityInput.value;
    let xml = new XMLHttpRequest();
    xml.open(
      "GET",
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=65a961bc1bf6f42654bc807569689f24&units=metric`
    );
    xml.onreadystatechange = function () {
      if (xml.readyState === 4 && xml.status === 200) {
        displayResult(JSON.parse(xml.responseText));
      }
    };
    xml.send();
  }
}

displayResult = (data) => {
  let date = new Date();
  let localTime = date.getTime();
  let localOffset = date.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;

  let utcTime = utc + 1000 * data.timezone;
  let newCity = new Date(utcTime);

  let mSunrise = new Date(data.sys.sunrise * 1000).getMinutes();
  let mSunset = new Date(data.sys.sunset * 1000).getMinutes();

  let hSunrise = new Date(data.sys.sunrise * 1000).getHours();
  let hSunset = new Date(data.sys.sunset * 1000).getHours();

  let cityHour = newCity.getHours();
  let cityMinute = newCity.getMinutes();
  cityHour < 10 ? (cityHour = `0${cityHour}`) : cityHour;
  cityMinute < 10 ? (cityMinute = `0${cityMinute}`) : cityMinute;

  time.innerHTML = `${cityHour}:${cityMinute} h`;
  temperature.innerHTML = `${Math.round(data.main.temp * 10) / 10} &deg;C`;
  maxTemp.innerHTML = `${Math.round(data.main.temp_max * 10) / 10} &deg;C`;
  minTemp.innerHTML = `${Math.round(data.main.temp_min * 10) / 10} &deg;C`;

  windSpeed.innerHTML = `${Math.round(data.wind.speed * 10) / 10} km/h`;
  humidity.innerHTML = `${Math.round(data.main.humidity * 10) / 10} %`;
  pressure.innerHTML = `${Math.round(data.main.pressure * 10) / 10} hPa`;

  hSunrise < 10 ? (hSunrise = `0${hSunrise}`) : hSunrise;
  hSunset < 10 ? (hSunset = `0${hSunset}`) : hSunset;

  sunriseTime.innerHTML = `${hSunrise}:${mSunrise} h`;
  sunsetTime.innerHTML = `${hSunset}:${hSunset} h`;
  weatherStatus.innerHTML = `Weather Status: ${data.weather[0].description}`;

  let currentStatus = data.weather[0].description;

  if (currentStatus.includes("clear sky")) {
    image.setAttribute("src", "img/dayIcons/clearsky.png");
  } else if (currentStatus.includes("clouds")) {
    image.setAttribute("src", "img/dayIcons/brokenclouds.png");
  } else if (currentStatus.includes("rain")) {
    image.setAttribute("src", "img/dayIcons/rain.png");
  } else if (currentStatus.includes("thunderstorm")) {
    image.setAttribute("src", "img/dayIcons/thunderstorm.png");
  } else if (currentStatus.includes("snow")) {
    image.setAttribute("src", "img/dayIcons/snow.png");
  } else if (currentStatus.includes("mist")) {
    image.setAttribute("src", "img/dayIcons/mist.png");
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  day.innerHTML = days[newCity.getDay()];
  date_year.innerHTML = `${months[newCity.getMonth()]} ${newCity.getUTCDate()}, ${newCity.getFullYear()}`;
};
