// Html elements
let tempElement = document.getElementById("temp");
let locationElement = document.getElementById("location");
let feelsLikeElement = document.getElementById("feels-like");
let humidityElement = document.getElementById("humidity");
let maxtempElement = document.getElementById("max-temp");
let mintempElement = document.getElementById("min-temp");
let pressureElement = document.getElementById("pressure");
let sealevelElement = document.getElementById("sea-level");
let inputElement = document.getElementById("city-input");
let searchElement = document.getElementById("search-btn");
let weatherdescriptionElement = document.getElementById("weather-description");
let forecastElement = document.getElementById("forecast-container");
let imageContainerElement = document.getElementById("image-container");

// Adding leaflet.js map
var map = L.map("map").setView([0, 0], 1);
let marker = null;
L.tileLayer(
  "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=p14qZB5wwA8Y5xetwUyR",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);

let markerElement = null;

//   Method to fetch weather information based on location
let fetchWeatherInfo = async (city) => {
  //API Call
  //URL
  try {
    // API KEY
    let API_KEY = "ca62d981f998767dd6c8395950bb7f3d";
    // API ENDPOINT
    let url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      API_KEY;

    // API CALL
    let response = await fetch(url);
    let formattedData = await response.json();
    console.log(formattedData);
    //If the city is not found...
    if (formattedData.cod === "404") {
      alert("City not found");
    } else {
      //city found

      let longitude = formattedData.coord.lon;
      let latitude = formattedData.coord.lat;
      //   Weather forecast API ENDPOINT
      let forecastUrl =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        API_KEY;

      let response2 = await fetch(forecastUrl);
      let formattedData2 = await response2.json();

      if (formattedData2.cod === "404") {
        alert("Location not found");
        return;
      }

      let listofForcastweathers = formattedData2.list;

      let output = "";
      // Looping over forecast weathers array
      for (let i = 0; i < 20; i++) {
        console.log(listofForcastweathers[i]);
        let weather = listofForcastweathers[i].main.temp - 273.15;
        let time = listofForcastweathers[i].dt_txt;
        time = time.slice(5, time.length - 3);
        let dateAndTime = time.split(" ");
        let date = dateAndTime[0];
        let hourlyTime = dateAndTime[1];

        let iconcode = listofForcastweathers[i].weather[0].icon;
        // Weather icon
        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        output +=
          "<div class='forecast-card'>  <p class='text-white'>" +
          date +
          "</p>  <p class='text-white'>" +
          hourlyTime +
          "</p> <img src='" +
          iconurl +
          "' alt='forecast image-" +
          i +
          "'/> <p class='text-white'>" +
          weather.toFixed(0) +
          "°C </p></div> ";
      }

      // Displaying forecast weather
      forecastElement.innerHTML = output;

      let place = formattedData.name;

      // Displaying location
      locationElement.innerHTML = place;

      let iconcode = formattedData.weather[0].icon;
      let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      // Displaying weather icon
      imageContainerElement.innerHTML =
        "<img class='weather-img' src='" + iconurl + "' alt='weather icon'/>";

      let weatherdescription = formattedData.weather[0].description;
      // displaying weather description
      weatherdescriptionElement.innerHTML = weatherdescription;

      let mainInformation = formattedData.main;

      // Displaying feels like in celsius
      let feelsLikeInC = mainInformation.feels_like - 273.15;
      feelsLikeElement.innerHTML = feelsLikeInC.toFixed(0) + "°C";

      // Displaying humidity (in %)
      let humidity = mainInformation.humidity;
      humidityElement.innerHTML = humidity.toFixed(0) + "%";

      // Displaying pressure
      let pressure = mainInformation.pressure;
      pressureElement.innerHTML = pressure.toFixed(0) + "mb";

      // Displaying sea level
      let sea_level = mainInformation.sea_level - 273.15;
      sealevelElement.innerHTML = sea_level.toFixed(0) + "FT";

      // Displaying temperature in celcius
      let tempInC = mainInformation.temp - 273.15;
      tempElement.innerHTML = tempInC.toFixed(0) + "°C";

      // Displaying max temperature
      let maxTempInC = mainInformation.temp_max - 273.15;
      maxtempElement.innerHTML = maxTempInC.toFixed(0) + "°C";

      // Displaying min temperature in celsius
      let minTempInC = mainInformation.temp_min - 273.15;
      mintempElement.innerHTML = minTempInC.toFixed(0) + "°C";

      // Removing old marker
      if (marker != null) {
        map.removeLayer(marker);
      }
      let markerIcon = new L.Icon({
        iconUrl: "assets/images/marker-icon-blue.png",
        shadowUrl: "assets/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      // Jumping to current location
      map.flyTo([latitude, longitude], 5);
      marker = L.marker([latitude, longitude], { icon: markerIcon }).addTo(map);

      if (!markerElement)
        markerElement = document.querySelector(
          ".leaflet-pane.leaflet-marker-pane > img"
        );
      markerElement.alt = "Map icon";
    }
  } catch (error) {
    // if anything goes wrong in the 'try' block,
    // it will jump to catch()
    console.log(error.message);
  }
};

fetchWeatherInfo("Stockholm");

//Change to handleClick()
const handleButtonClick = () => {
  let value = inputElement.value; //this will give the value
  if (value !== "") {
    fetchWeatherInfo(value);
  }
};

// Event listener on search button click
searchElement.addEventListener("click", handleButtonClick);
