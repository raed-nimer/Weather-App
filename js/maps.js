let searchBtnElement = document.getElementById("search-country-btn")
let countryFlagELement = document.getElementById("country-flag-container")
let countryNameELement = document.getElementById("country-name")
let searchInputElement = document.getElementById("country-input")
let capitalElement = document.getElementById("capital")
let languageElement = document.getElementById("language")
let populationELement = document.getElementById("population")
let timezoneElement = document.getElementById("timezone")
 let continentElement = document.getElementById("continent")
let regionElement = document.getElementById("region")
let countriesInformation = []
var map = L.map('map').setView([0, 0], 1);
let marker = null
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=p14qZB5wwA8Y5xetwUyR', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }).addTo(map);
let fetchCountryInfo = async () => {
    
    //API Call
    //URL
    try {
        let url = "https://restcountries.com/v3.1/all" 

        let response = await fetch(url)
        let formattedData = await response.json()
        console.log(formattedData);
        countriesInformation = [...formattedData]
        let countryNames = formattedData.map((country) => country.name.common)
        console.log(countryNames);
        let output = ""
        for (let i = 0; i < countryNames.length; i++) {
            output += "<option>"+countryNames[i]+"</option>"
            
        }
        
        searchInputElement.innerHTML = output 
        // setting first country as default
        populateData(countriesInformation[0])
       
    } 
 catch(error){
    console.log("We are inside catch block");
    console.log(error.message);
    // if anything goes wrong in the 'try' block,
    // it will jump to catch()

}
}
let populateData = (country) => {
    console.log(country);
    countryNameELement.innerHTML = country.name.common
    countryFlagELement.innerHTML = "<img src='"+ country.flags.png +"'/>"
    capitalElement.innerHTML = country.capital[0]
    populationELement.innerHTML = country.population 
    regionElement.innerHTML = country.region
    timezoneElement.innerHTML = country.timezones.join(", ")
    languageElement.innerHTML = Object.values(country.languages)
    continentElement.innerHTML = country.continents.join(", ")
    console.log(country.flag);

    let latitude = country.latlng[0]
    let longitude = country.latlng[1]

      // Removing old marker
      if (marker != null) {
        map.removeLayer(marker)
    }
    // Jumping to current location
 //   map.setView([latitude, longitude], 10)
 map.flyTo([latitude, longitude], 5);
 marker = L.marker([latitude, longitude]).addTo(map);
    
}

fetchCountryInfo()
//Change to handleClick()
const handleButtonClick = () => {
    let value = searchInputElement.value //this will give the value
    console.log(value)
    if (value !== ""){
}
    
}
    const handleSelectChange = () => {
        let value = searchInputElement.value
        console.log(value);
        let country = null
        for (let i = 0; i < countriesInformation.length; i++) {
            if (countriesInformation[i].name.common == value) {
                console.log(countriesInformation[i]);
                country = countriesInformation[i]
                break
                
            }
            
        }
        // Passing country to populateData function
        populateData(country)
    }


searchInputElement.addEventListener("change", handleSelectChange)