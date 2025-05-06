// Define your const

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");
const errorInfo = document.getElementById("errorInfo");

const API_KEY = "84cf007586292a4a191e20860845941c";

// Event Listener on the search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  getWeather(city);
});

// Function to fetch Weather Data
// Receive the city from the input
function getWeather(city) {

  cancelPrev();

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  fetch(weatherURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
      errorInfo.innerHTML = `<p>City not found. Try again.</p>`;
      weatherInfo.innerHTML = "";
    });

  // Funtion to clear previous results when a new city is searched
  function cancelPrev() {
    displayWeather.innerHTML = "";
    errorInfo.innerHTML = "";
  }

  // define your data variables to be fetched
  function displayWeather(data) {
    const name = data.name; // display data name
    const rawTemp = data.main.temp; // display data temperature
    const actualTemp = Math.floor(((rawTemp - 32) * 5) / 9); // converting raw temp to actual Temp
    const description = data.weather[0].description; // display weather description
    const icon = data.weather[0].icon; // display icon

    // display weather deatils
    weatherInfo.innerHTML = `
        <h2>City Name: ${name}</h2>
        <p>Temperature: ${actualTemp}°C</p>
        <p>Description: ${description}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}"/>
        `;
  }
}
