let idahoFallsId = 5596475;
let calgaryId = 5913490;
let sanDiegoId = 5391811;
let romeId = 3164670;

// sample url 'https://api.openweathermap.org/data/2.5/weather?id=5596475&appid=96f881dc52b0a77480e60ae03cff87e0&units=imperial'

let cityIds = [idahoFallsId, calgaryId, sanDiegoId, romeId];

for (let i = 0; i < cityIds.length; i++){
    const requestURL = `https://api.openweathermap.org/data/2.5/weather?id=${cityIds[i]}&appid=96f881dc52b0a77480e60ae03cff87e0&units=imperial`

    fetch(requestURL)
    .then(response => {
        return response.json();
    })
    .then(curCityData => {
        let boxContainer = document.getElementById(`box${i+1}-content`);

        let weatherContainer = document.createElement('div');
        let weatherHeader = document.createElement('h4');
        let weatherUl = document.createElement('ul');
        let currently = document.createElement('li');
        let high = document.createElement('li');
        let low = document.createElement('li');
        let humidity = document.createElement('li');

        weatherHeader.innerHTML = 'Weather Forecast';
        currently.innerHTML = `Currently: ${Math.round(curCityData['main']['temp'])}°F`;
        high.innerHTML = `High: ${Math.round(curCityData['main']['temp_max'])}°F`;
        low.innerHTML = `Low: ${Math.round(curCityData['main']['temp_min'])}°F`;
        humidity.innerHTML = `Humidity: ${curCityData['main']['humidity']}%`;

        weatherUl.appendChild(currently);
        weatherUl.appendChild(high);
        weatherUl.appendChild(low);
        weatherUl.appendChild(humidity);

        weatherContainer.appendChild(weatherHeader);
        weatherContainer.appendChild(weatherUl);

        boxContainer.appendChild(weatherContainer);

        weatherContainer.classList.add('container', 'weather-container');
    })
}