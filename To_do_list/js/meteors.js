const meteorsTable = document.getElementById('section-table-body');

async function connectNasa() {
    const today = new Date().toLocaleDateString('en-CA'); 
    const apiKey = "vyiTiMFRrjHjgbms9arWKnrlIWrmARGWfvyMeJWa";
    const apiURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const asteroids = data.near_earth_objects[today];

        console.log("Datos cargados:", asteroids); 

        asteroids.forEach((meteor, i) => {
            if (i < 5) {
                const name = meteor.name;
                const diameter = meteor.estimated_diameter.meters.estimated_diameter_max.toFixed(2);
                const isDangerous = meteor.is_potentially_hazardous_asteroid;
                const urlNasa = meteor.nasa_jpl_url;
    
                meteorsTable.innerHTML += `
                <tr class="section-table-body-row">
                    <th class="section-table-body-row_head" scope="row">${i + 1}</th>
                    <td class="section-table-body-row_item"><strong>${name}</strong></td>
                    <td class="section-table-body-row_item">${diameter} m</td>
                    <td class="section-table-body-row_item">${isDangerous ? 'SÍ. Vas a morir' : 'No. Hoy te salvas'}</td>
                    <td class="section-table-body-row_item">
                        <a href="${urlNasa}" target="_blank" class="btn btn-sm btn-outline-light section-table-body-row_item__button">+Info</a>
                    </td>
                </tr>
                `;
            }
        });

    } catch (e) {
        console.error(e.message);
        if(meteorsTable) {
            meteorsTable.innerHTML = `<tr><td colspan="5" class="text-center">Error: ${e.message}</td></tr>`;
        }
    }
}

connectNasa();