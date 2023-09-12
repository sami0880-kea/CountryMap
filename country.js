let prevCountry;

document.getElementById('svg2').addEventListener('click', function (event) {
    let countryTarget = event.target;
    let countryCode = countryTarget.id;

    if(prevCountry) prevCountry.style.fill = "rgb(220, 220, 220)";

    countryTarget.style.fill = "lightblue";
    prevCountry = countryTarget;
    getCountryInfo(countryCode)
});

async function getCountryInfo(countryCode) {
    if(countryCode == "svg2") return null
    try {
        const res = await fetch(`https://countries.plaul.dk/api/countries/${countryCode}`)
        if(res.status >= 400) {
            document.getElementById("country_info").style.display = 'none';
            const error = new Error(`Error ${res.status} ${res.statusText}`)
            throw error
        }
        const body = await res.json()
        document.getElementById("country_info").style.display = 'block';

        document.getElementById("country_image").setAttribute("src", body.flag)
        document.getElementById("country_name").innerHTML = `Name: ${body.name.common}`
        document.getElementById("country_un").innerHTML = `Member of UN: ${body.unMember}`
        let currenciesList = []
        Object.keys(body.currencies).forEach(element => {
            currenciesList.push(element)
        })
        document.getElementById("country_curreny").innerHTML = `Curreny: ${currenciesList.join(",")}`
        document.getElementById("country_capital").innerHTML = `Capital: ${body.capital}`
        document.getElementById("country_borders").innerHTML = `Borders: ${body.borders.join(",")}`
    }
    catch (err) {
        console.log(err.message)
    }   
}