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


let apiCall = async (city) => {
    
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
    feelsLikeElement.innerHTML = "Feels Like:" + feelsLikeInC.toFixed(0) + "°C"
    console.log(feelsLikeInC);

    let humidity = mainInformation.humidity
    humidityElement.innerHTML = "Humidity:" + humidity.toFixed(0) + "%"
    console.log(humidity);

     // Displaying pressure
     let pressure = mainInformation.pressure
     pressure.innerHTML = "Pressure:" + pressure.toFixed(0) + "°C"
    
    // Displaying sea level
    let sea_level = mainInformation.sea_level - 273.15
    sealevelElement.innerHTML = "Sea Level:" + sea_level.toFixed(0) + "FT"

     // Displaying temperature in celcius
     let tempInC = mainInformation.temp - 273.15
     tempElement.innerHTML = tempInC.toFixed(0) + "°C"
    
     // Displaying max temperature
    let maxTempInC = mainInformation.temp_max - 273.15
    maxtempElement.innerHTML = "Max Temperature:" + maxTempInC.toFixed(0) + "°C"
    console.log(maxTempInC);


    let minTempInC = mainInformation.temp_min - 273.15
    mintempElement.innerHTML = "Min Temperature:" + minTempInC.toFixed(0) + "°C"
    console.log(minTempInC);


    let timezone = formattedData.timezone
    console.log(timezone);
    let wind = formattedData.wind
    console.log(wind);
    let weatherInfo = formattedData.weather
    console.log(weatherInfo);
    
}

} catch(error){
    console.log("We are inside catch block");
    console.log(error.message);
    // if anything goes wrong in the 'try' block,
    // it will jump to catch()
}

}

apiCall("Stockholm")

//Change to handleClick()
const handleButtonClick = () => {
    let value = inputElement.value //this will give the value
    console.log(value)
    if (value !== ""){
    apiCall(value)
}
    
}
    


searchElement.addEventListener("click", handleButtonClick)



