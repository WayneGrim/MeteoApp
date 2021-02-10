const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

async function main(withIP = true) {
    let ville;

    if (withIP) {
        const ip = await fetch('https://api.ipify.org?format=json')
            .then(resultat => resultat.json())
            .then(json => json.ip)

        ville = await fetch('http://api.ipstack.com/' + ip + '?access_key=41e34caaf88ed800cb005e86a8e37c9b')
            .then(resultat => resultat.json())
            .then(json => json.city)
    } else {
        ville = document.querySelector('#ville').textContent;
    }

    const meteo = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + ville + '&lang=fr&appid=a56bebdc973c623464e7885da32d7c2d')
        .then(resultat => resultat.json())
        .then(json => json)

    console.log(meteo);

    displayWeatherInfos(meteo)
}

function displayWeatherInfos(data) {
    const name = data.name;
    const temperature = data.main.temp - 273.15;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = conditions;

    document.querySelector('i.wi').className = weatherIcons[conditions];

    document.body.className = conditions.toLowerCase();
}

const ville = document.querySelector('#ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true;
})

ville.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        ville.contentEditable = false;
        main(false);

    }
})

main();