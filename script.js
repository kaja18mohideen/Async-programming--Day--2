window.getWeather = function(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(weatherData => {
            console.log('Weather data:', weatherData); 
            alert(`Weather at (${lat}, ${lon}): ${weatherData.weather[0].description}, Temperature: ${weatherData.main.temp}°C`);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
};

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(country => {
                const card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-4');
                card.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${country.name.common}</h5>
                            <p class="card-text">Capital: ${country.capital}</p>
                            <p class="card-text">Region: ${country.region}</p>
                            <p class="card-text">Country Code: ${country.cca2}</p>
                            <p class="card-text">Latitude: ${country.latlng[0]}</p>
                            <p class="card-text">Longitude: ${country.latlng[1]}</p>
                            <img src="${country.flags.svg}" class="card-img-top" alt="Flag">
                            <button class="btn btn-primary" onclick="getWeather(${country.latlng[0]}, ${country.latlng[1]})">Get Weather</button>
                        </div>
                    </div>
                `;
                document.getElementById('cardContainer').appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
        });
});
