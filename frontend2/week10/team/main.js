import { getJSON, getLocation } from "./utilities.js";

const baseUrl =
  "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-02-02";

// functions
/*
- getCoords()
- getQuakeData()
- renderQuakeList()
- buildListItem()
*/

async function getCoords() {
    // get location
    let locResp = await getLocation();
    return locResp.coords;
}

async function buildUrl() {
    let location = await getCoords();
    const radius = 100;
    const query = baseUrl + 
                `&latitude=${location.latitude}&longitude=${location.longitude}&maxradiuskm=${radius}`;
    return query;
}

async function getQuakeData() {
    let query = await buildUrl();
    let quakes = await getJSON(query);
    return quakes.features;
}

async function renderQuakeList() {
    const ul = document.getElementById("quakeList");
    let quakeList = await getQuakeData();
    quakeList.forEach(quake => {
        let li = document.createElement('li');
        li.textContent = `${quake.properties.title} ${new Date(quake.properties.time)}`
        li.addEventListener("click", () => getQuakeDetails(li, quake))
        ul.appendChild(li);
    });
}

function getQuakeDetails(li, quake) {
    let curProps = quake.properties;
    let p = document.createElement('p');
    p.textContent = `Time: ${new Date(curProps.time)}, Place: ${curProps.place}, Magnitude: ${curProps.mag}`;
    if (li.childNodes.length == 1) {
        li.appendChild(p);
    }
}

renderQuakeList();