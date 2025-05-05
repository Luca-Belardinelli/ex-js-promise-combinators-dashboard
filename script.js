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

        // // simulazione informazioni 

        // const destinationData = [{ name: "london", country: "united kingdom" }];
        // const weathersData = [{ temperature: 30, weather_description: "Piovoso" }];
        // const airportsData = [{ name: "Harry potter" }];


        // dati d aprendere dalle chiamate
        return {
            city: destinationData[0].name,
            country: destinationData[0].country,
            temperature: weathersData[0].temperature,
            weather: weathersData[0].weather_description,
            airport: airportsData[0].name
        }

    } catch (error) {
        console.log(error => (`"Non è stato possibile proseguire con la ricerca", ${error}`))
    }

}

getDashboardData('london')
    .then(data => {
        console.log('Dashboard data:', data);
        console.log(`${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`);
    })
    .catch(error => console.error(error));




//     🎯 Bonus 1 - Risultato vuoto
// Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione,
//  semplicemente i dati relativi a quella chiamata verranno settati a null e  la frase relativa non viene stampata.
// Testa la funzione con la query “vienna” (non trova il meteo).

// // Risposta API

// {

//   city: "Vienna",

//   country: "Austria",

//   temperature: null,

//     weather: null,

//   airport: "Vienna International Airport"

// }

//

// // Output in console

// Vienna is in Austria.

// The main airport is Vienna International Airport.



// 🎯 Bonus 2 - Chiamate fallite
// Attualmente, se una delle chiamate fallisce, **Promise.all()** rigetta l'intera operazione.

// Modifica `getDashboardData()` per usare **Promise.allSettled()**, in modo che:

//     Se una chiamata fallisce, i dati relativi a quella chiamata verranno settati a null.
//     Stampa in console un messaggio di errore per ogni richiesta fallita.
//     Testa la funzione con un link fittizio per il meteo (es. https://www.meteofittizio.it).
