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

    locationElement.innerHTML = "City:" + place

    let iconcode = formattedData.weather[0].icon

    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    
