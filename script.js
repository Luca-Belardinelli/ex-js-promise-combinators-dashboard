// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query),
// che accetta una città come input e recupera simultaneamente:

//     Nome completo della città e paese da / destinations ? search = [query]
//     (result.name, result.country, nelle nuove proprietà city e country).
//     Il meteo attuale da / weathers ? search = { query }
//     (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
//     Il nome dell’aeroporto principale da / airports ? search = { query }
//     (result.name nella nuova proprietà airport).

// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
// Note del docente
// Scrivi la funzione getDashboardData(query), che deve:

//     Essere asincrona (async).
//     Utilizzare Promise.all() per eseguire più richieste in parallelo.
//     Restituire una Promise che risolve un oggetto contenente i dati aggregati.
//     Stampare i dati in console in un messaggio ben formattato.
//     Testa la funzione con la query "london"


async function getDashboardData(query) {
    try {

        // array con le chiamate da effettuare 
        const promises = [
            fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`),
            fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`),
            fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)
        ];

        // variabile array dove vado a salvare i dati che riceverò tramite promise all
        const [destinationsresponse, weathersresponse, airportsresponse] = await Promise.all(promises);
        console.log(destinationsresponse, weathersresponse, airportsresponse)


        // risposta in formato json
        const destinationData = await destinationsresponse.json();
        const weathersData = await weathersresponse.json();
        const airportsData = await airportsresponse.json();

        // simulazione informazioni 

        // const destinationData = [{ name: "london", country: "united kingdom" }];
        // const weathersData = [{ temperature: 30, weather_description: "Piovoso" }];
        // const airportsData = [{ name: "Harry potter" }];


        // dati d aprendere dalle chiamate
        const city = destinationData[0].name;
        const country = destinationData[0].country;
        const temperature = weathersData[0].temperature;
        const weather = weathersData[0].weather_description;
        const airport = airportsData[0].name;

        // creazione oggetto 
        const dashboardData = { city, country, temperature, weather, airport };

        console.log(`${dashboardData.city} is in ${dashboardData.country}.\n` +
            `Today there are ${dashboardData.temperature} degrees and the weather is ${dashboardData.weather}.\n` +
            `The main airport is ${dashboardData.airport}.\n`)

    } catch (error) {
        throw new Error("Non è stato possibile proseguire con la ricerca");
    }

}

getDashboardData("london")