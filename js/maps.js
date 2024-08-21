// Html elements
let searchBtnElement = document.getElementById("search-country-btn");
let countryFlagELement = document.getElementById("country-flag-container");
let countryNameELement = document.getElementById("country-name");
let searchInputElement = document.getElementById("country-input");
let capitalElement = document.getElementById("capital");
let languageElement = document.getElementById("language");
let populationELement = document.getElementById("population");
let timezoneElement = document.getElementById("timezone");
let continentElement = document.getElementById("continent");
let regionElement = document.getElementById("region");
// Array to hold all countries information
let countriesInformation = [];
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

// Method to fetch all countries information
let fetchCountryInfo = async () => {
  //API Call
  //URL
  try {
    // API ENDPOINT
    let url = "https://restcountries.com/v3.1/all";
    // API CALL
    let response = await fetch(url);
    let formattedData = await response.json();
    console.log(formattedData);
    countriesInformation = [...formattedData];
    // Saving countries names into an array
    let countryNames = formattedData.map((country) => country.name.common);
    console.log("countries: ", countryNames);
    // Sorting country name alphabetically
    countryNames.sort();
    console.log("countries after: ", countryNames);
    // Creating options list for select based on country names
    let output = "";
    for (let i = 0; i < countryNames.length; i++) {
      output += "<option>" + countryNames[i] + "</option>";
    }

    searchInputElement.innerHTML = output;
    let country = countriesInformation.find(
      (c) => c.name.common === countryNames[0]
    );
    // setting first country as default
    populateData(country);
  } catch (error) {
    console.log("We are inside catch block");
    console.log(error.message);
    // if anything goes wrong in the 'try' block,
    // it will jump to catch()
  }
};

// Method to show/populate data
let populateData = (country) => {
  //   Displaying country name
  countryNameELement.innerHTML = country.name.common;
  //  Displaying country flag
  countryFlagELement.innerHTML = "<img src='" + country.flags.png + "' alt='country flag'/>";
  capitalElement.innerHTML = country.capital[0];
  populationELement.innerHTML = country.population;
  regionElement.innerHTML = country.region;
  timezoneElement.innerHTML = country.timezones.join(", ");
  languageElement.innerHTML = Object.values(country.languages).join(", ");
  continentElement.innerHTML = country.continents.join(", ");
  console.log(country.flag);
  // Getting latitude and longitude
  let latitude = country.latlng[0];
  let longitude = country.latlng[1];

  // Removing old marker
  if (marker != null) {
    map.removeLayer(marker);
  }
  // Jumping to current location
  //   map.setView([latitude, longitude], 10)
  map.flyTo([latitude, longitude], 5);
  marker = L.marker([latitude, longitude]).addTo(map);
};

fetchCountryInfo();
//Change to handleClick()
const handleButtonClick = () => {
  let value = searchInputElement.value; //this will give the value
  console.log(value);
  if (value !== "") {
  }
};

// Method to handle dropdown selection change
const handleSelectChange = () => {
  let value = searchInputElement.value;
  console.log(value);
  let country = null;
  for (let i = 0; i < countriesInformation.length; i++) {
    if (countriesInformation[i].name.common == value) {
      console.log(countriesInformation[i]);
      country = countriesInformation[i];
      break;
    }
  }
  // Passing country to populateData function
  populateData(country);
};
// Change event listener on select dropdown
searchInputElement.addEventListener("change", handleSelectChange);
