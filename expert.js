// localStorage.setItem("test", "Москва");

let preloader = document.querySelector(".app-loader");
let loader = document.querySelector(".app-container");

weather();
setTimeout(sayHi, 200);

function sayHi() {
    preloader.className = "app-loader none";
    loader.className = "app-container";
}

let buttom = document.querySelector(".app-container-form-buttom-get");
buttom.onclick = function geting() {
    let value = document.querySelector(".app-container-form-input-city").value;
    localStorage.setItem("test", value);
};

function weather() {
    // API ключ
    let apiKey = "Ваш ключ";
    // Город погода которого нужна
    let city;
    if (localStorage.getItem("test")) {
        city = localStorage.getItem("test");
        // document.querySelector(".app-container-form-input-city").value = city;
    } else {
        city = "Москва";
        // document.querySelector(".app-container-form-input-city").value = "";
    }

    // Формируем url для GET запроса
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}&units=metric`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const { temp } = data.main;
            const place = data.name;
            const { description, icon } = data.weather[0];
            const { sunrise, sunset } = data.sys;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const fahrenheit = (temp * 9) / 5 + 32;
            // Converting Epoch(Unix) time to GMT
            const sunriseGMT = new Date(sunrise * 1000);
            const sunsetGMT = new Date(sunset * 1000);
            // Interacting with DOM to show data
            iconImg.src = iconUrl;
            loc.textContent = `${place}`;
            desc.textContent = `${description}`;
            tempC.textContent = `${temp.toFixed(2)}°C`;
            tempF.textContent = `${fahrenheit.toFixed(2)}°F`;
            sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
            sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        });

    const iconImg = document.getElementById("app-container-weather-pic-icon");
    const loc = document.querySelector("#app-container-weather-location");
    const tempC = document.querySelector(".app-container-weather-cf-c");
    const tempF = document.querySelector(".app-container-weather-cf-f");
    const desc = document.querySelector(".app-container-weather-location-desk");
    const sunriseDOM = document.querySelector(
        ".app-container-weather-info-sunrise"
    );
    const sunsetDOM = document.querySelector(
        ".app-container-weather-info-sunset"
    );
}
