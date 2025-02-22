document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    if (city.trim() === "") {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "8da8d3c2d8536633b4d1e57b53358b01"; 
    const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=durban';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found!");
                return;
            }

            document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").innerText = `🌡 Temperature: ${data.main.temp}°C`;
            document.getElementById("description").innerText = `🌥 Condition: ${data.weather[0].description}`;
            document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
            document.getElementById("wind").innerText = `💨 Wind Speed: ${data.wind.speed} m/s`;

            const iconCode = data.weather[0].icon;
            document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            updateBackground(data.weather[0].main);
        })
        .catch(error => console.error("Error fetching weather data:", error));
});

function updateBackground(weather) {
    let bgImage;
    switch (weather.toLowerCase()) {
        case "clear":
            bgImage = "images/OIP.jpeg";
            break;
        case "clouds":
            bgImage = "images/cloudy.jpeg";
            break;
        case "rain":
            bgImage = "images/rainy.jpeg";
            break;
        case "snow":
            bgImage = "images/snow.jpeg";
            break;
        default:
            bgImage = "default-bg.jpg";
    }
    document.body.style.background = `url('${bgImage}') no-repeat center center/cover`;
}
