


async function main() {
    const ip = await fetch('https://api.ipify.org?format=json')
        .then(resultat => resultat.json())
        .then(json => json.ip)

    const ville = await fetch('http://api.ipstack.com/'+ip+'?access_key=41e34caaf88ed800cb005e86a8e37c9b')
        .then(resultat => resultat.json())
        .then(json => json.city)
                    
    const meteo = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+ville+'&lang=fr&appid=a56bebdc973c623464e7885da32d7c2d')
        .then(resultat => resultat.json())
        .then(json => json)

        console.log(meteo);







}







main();