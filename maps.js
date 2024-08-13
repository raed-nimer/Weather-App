let searchBtnElement = document.getElementById("search-country-btn")
let searchInputElement = document.getElementById("country-input")

let fetchCountryInfo = async () => {
    
    //API Call
    //URL
    try {
        let url = "https://restcountries.com/v3.1/all" 

        let response = await fetch(url)
        let formattedData = await response.json()
        console.log(formattedData);
       
    } 
 catch(error){
    console.log("We are inside catch block");
    console.log(error.message);
    // if anything goes wrong in the 'try' block,
    // it will jump to catch()

}
}

fetchCountryInfo()
//Change to handleClick()
const handleButtonClick = () => {
    let value = searchInputElement.value //this will give the value
    console.log(value)
    if (value !== ""){
}
    
}
    


searchBtnElement.addEventListener("click", handleButtonClick)
