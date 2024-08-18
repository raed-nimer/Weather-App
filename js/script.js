let tempElement = document.getElementById("temp")
let locationElement = document.getElementById("location")
let feelsLikeElement = document.getElementById("feels-like")
let humidityElement = document.getElementById("humidity")
let maxtempElement = document.getElementById("max-temp")
let mintempElement = document.getElementById("min-temp")
let pressureElement = document.getElementById("pressure")
let sealevelElement = document.getElementById("sea-level")
let inputElement = document.getElementById("city-input")
let searchElement = document.getElementById("search-btn")
let imageElement = document.getElementById("image")
let weatherdescriptionElement = document.getElementById("weather-description")
let forecastElement = document.getElementById("forecast-container")
var map = L.map('map').setView([0, 0], 1);
let marker = null
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=p14qZB5wwA8Y5xetwUyR', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }).addTo(map);
let fetchWeatherInfo = async (city) => {
    
    //API Call
    //URL
    try {
        let API_KEY = "ca62d981f998767dd6c8395950bb7f3d"
        let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY
        console.log(url);

        let response = await fetch(url)
        let formattedData = await response.json()
        console.log(formattedData);
        //If the city is not found...
        if(formattedData.cod === '404'){
            alert("City not found")
        } else { //city found
   
    
    let longitude = formattedData.coord.lon
    let latitude = formattedData.coord.lat
    let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + API_KEY

    let response2 = await fetch(forecastUrl)
    let formattedData2 = await response2.json()

    if (formattedData2.cod === "404") {
        alert("Location not found")
        return
    }

    let listofForcastweathers = formattedData2.list 
    console.log(listofForcastweathers);
    
    let output = ""

    for (let i = 0; i < 20; i++) {
        console.log(listofForcastweathers[i]);
        let weather = listofForcastweathers[i].main.temp - 273.15
        let time = listofForcastweathers[i].dt_txt
        time = time.slice(5,time.length-3)
        let dateAndTime = time.split(" ")
        let date = dateAndTime[0]
        let hourlyTime = dateAndTime[1]

        let iconcode = listofForcastweathers[i].weather[0].icon
        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        output += "<div class='forecast-card'>  <p class='text-white'>" + date + "</p>  <p class='text-white'>" + hourlyTime + "</p> <img src='"+ iconurl +"'/> <p class='text-white'>" + weather.toFixed(0) + "°C </p></div> "

    }

    forecastElement.innerHTML = output

     let place = formattedData.name

    locationElement.innerHTML = place

    let iconcode = formattedData.weather[0].icon

    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

    imageElement.src=iconurl
    
    let weatherdescription = formattedData.weather[0].description

    weatherdescriptionElement.innerHTML = weatherdescription

    
    let mainInformation = formattedData.main
    console.log(mainInformation);

    let feelsLikeInC = mainInformation.feels_like - 273.15
    feelsLikeElement.innerHTML = feelsLikeInC.toFixed(0) + "°C"
    console.log(feelsLikeInC);

    let humidity = mainInformation.humidity
    humidityElement.innerHTML = humidity.toFixed(0) + "%"
    console.log(humidity);

     // Displaying pressure
     let pressure = mainInformation.pressure
     pressureElement.innerHTML = pressure.toFixed(0) + "mb"
    
    // Displaying sea level
    let sea_level = mainInformation.sea_level - 273.15
    sealevelElement.innerHTML = sea_level.toFixed(0) + "FT"

     // Displaying temperature in celcius
     let tempInC = mainInformation.temp - 273.15
     tempElement.innerHTML = tempInC.toFixed(0) + "°C"
    
     // Displaying max temperature
    let maxTempInC = mainInformation.temp_max - 273.15
    maxtempElement.innerHTML = maxTempInC.toFixed(0) + "°C"
    console.log(maxTempInC);


    let minTempInC = mainInformation.temp_min - 273.15
    mintempElement.innerHTML = minTempInC.toFixed(0) + "°C"
    console.log(minTempInC);


    let timezone = formattedData.timezone
    console.log(timezone);
    let wind = formattedData.wind
    console.log(wind);
    let weatherInfo = formattedData.weather
    console.log(weatherInfo);
    
    // Removing old marker
    if (marker != null) {
        map.removeLayer(marker)
    }
    // Jumping to current location
 //   map.setView([latitude, longitude], 10)
 map.flyTo([latitude, longitude], 5);
 marker = L.marker([latitude, longitude]).addTo(map);
 // map.panTo(latitude, longitude, {
 //   animate: true,
 //   duration: 5,
 // });
}

} catch(error){
    console.log("We are inside catch block");
    console.log(error.message);
    // if anything goes wrong in the 'try' block,
    // it will jump to catch()
}

}

fetchWeatherInfo("Stockholm")

//Change to handleClick()
const handleButtonClick = () => {
    let value = inputElement.value //this will give the value
    console.log(value)
    if (value !== ""){
    fetchWeatherInfo(value)
}
    
}
    


searchElement.addEventListener("click", handleButtonClick)




// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//     .openPopup();

