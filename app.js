const cleAPI = '823d778961eb4605940153151240811';

const formulaireMeteo = document.getElementById('formulaire-meteo');
const inputVille = document.getElementById('ville');
const carteAujourdhui = document.getElementById('aujourdhui');
const cartePrevisions = document.getElementById('previsions');

async function obtenirMeteo(ville) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${cleAPI}&q=${ville}&days=4&aqi=no&alerts=no&lang=fr`;
    const reponse = await fetch(url);
    const donnees = await reponse.json();

    if (donnees.error) {
        alert('Ville non trouvée.');
    } else {
        afficherMeteo(donnees);
    }
}

function afficherMeteo(donnees) {
    const actuel = donnees.current;
    const htmlAujourdhui = `
        <h2>${donnees.location.name}, ${donnees.location.country}</h2>
        <p><strong>${actuel.temp_c}°C</strong></p>
        <p>${actuel.condition.text}</p>
        <p>${actuel.is_day === 1 ? 'Jour' : 'Nuit'}</p>
    `;
    carteAujourdhui.innerHTML = htmlAujourdhui;

    let htmlPrevisions = '';
    donnees.forecast.forecastday.forEach(jour => {
        htmlPrevisions += `
            <div class="carte-meteo">
                <h3>${new Date(jour.date).toLocaleDateString()}</h3>
                <p>${jour.day.avgtemp_c}°C</p>
                <p>${jour.day.condition.text}</p>
            </div>
        `;
    });
    cartePrevisions.innerHTML = htmlPrevisions;
}

formulaireMeteo.addEventListener('submit', function (e) {
    e.preventDefault();
    const ville = inputVille.value.trim();
    if (ville) {
        obtenirMeteo(ville);
        inputVille.value = '';
    }
});
