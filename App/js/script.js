const apikey = "2f50643fc8abe1f1e88b3dc9e78f96f5";

const city = document.querySelector(".city");
const icon = document.querySelector(".icon");
const descriptionData = document.querySelector(".description");
const tempData = document.querySelector(".temp");
const humidityData = document.querySelector(".humidity");
const windData = document.querySelector(".wind");
const weatherInfo = document.querySelector(".weather");
const searchButton = document.querySelector(".search-button");
const searchBar = document.querySelector('.search-bar');

const fetchWeather = async (city) => {
    if (!city) return;

        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`);
        const data = await response.json();

        displayWeather(data)
}

const displayWeather = (data) => {
    if (!data || !data.weather) return;

    const { name, weather, main, wind } = data;
    const { icon, description } = weather[0];
    const { temp, humidity } = main;
    const { speed } = wind;

    city.innerText = `Weather in ${name}`;
    icon.src = `https://openweathermap.org/img/wn/${icon}.png`;
    descriptionData.innerText = description;
    tempData.innerText = `${temp}°C`;
    humidityData.innerText = `Humidity ${humidity}%`;
    windData.innerText = `Wind speed: ${speed} Km/h`;
    weatherInfo.classList.remove("loading");
}

const search = () => {
    fetchWeather(document.querySelector(".search-bar")?.value);
}

searchButton.onclick = () => {
    search();
};

searchBar.onkeyup = (event) => {
    if (event.key === "Enter") {
        search();
    }
}

fetchWeather("Montevideo");