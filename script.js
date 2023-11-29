document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cardsContainer");

  // Function to create a card element
  const createCard = (data) => {
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-sm-12", "mb-3");

    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    cardHeader.innerText = data.name.common;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Adding card content
    const content = `
            <img src="${data.flags.png}" alt="Flag">
            <p>Capital: ${data.capital}</p>
            <p>Latlng: ${data.latlng.join(", ")}</p>
            <p>Region: ${data.region}</p>
            <p>Country Codes: ${data.cca3}</p>
        `;

    cardBody.innerHTML = content;

    // Adding button
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.innerText = "Click for Weather";
    button.addEventListener("click", () => getWeather(data.cca3)); // Assuming alpha2Code is used as the country code

    // Appending elements to card
    cardElement.appendChild(cardHeader);
    cardElement.appendChild(cardBody);
    cardBody.appendChild(button);

    card.appendChild(cardElement);
    cardsContainer.appendChild(card);
  };

  // Function to fetch data from Rest Countries API
  const fetchCountryData = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((country) => createCard(country));
      })
      .catch((error) => console.error("Error fetching country data:", error));
  };

  // Function to fetch weather data from OpenWeatherMap API
  const getWeather = (countryCode) => {
    const apiKey = "e8007b5e71dcbb10f72e2bac8dbe1e74";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?country=${countryCode}&appid=${apiKey}`;

    fetch(apiUrl)
            .then((response) => response.json())
            .then((weatherData) => {
                const weatherElement = document.getElementById(`weather-${countryCode}`);
                if (weatherData.weather && weatherData.weather.length > 0) {
                    const weatherDescription = weatherData.weather[0].description;
                    weatherElement.innerText = `Weather: ${weatherDescription}`;
                } else {
                    weatherElement.innerText = "Weather data not available";
                }
            })
            .catch((error) => console.error(`Error fetching weather data for ${countryCode}:`, error));
    };


  // Initial fetch when the page loads
  fetchCountryData();
});
