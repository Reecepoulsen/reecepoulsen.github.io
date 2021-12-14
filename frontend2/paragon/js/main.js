import {CharacterAPI} from './characterAPI.js';
import {TileBuilder} from './tileBuilder.js';
import { ParagonLS } from './localStorage.js';

const charAPI = new CharacterAPI();
const tb = new TileBuilder();
const LS = new ParagonLS();

window.addEventListener("load", async () => {
    // Set up event listeners 
    document.getElementById("show-all-btn").addEventListener("click", showAllChars);
    document.getElementById("show-all-link").addEventListener("click", showAllChars);
    document.getElementById("refresh-link").addEventListener("click", refreshData);
    document.getElementById("expand-link").addEventListener("click", () => {
        tb.expandOrCollapseAll('expand');
    });
    document.getElementById("collapse-link").addEventListener("click", () => {
        tb.expandOrCollapseAll('collapse');
    });
    document.getElementById("clear-favs").addEventListener("click", clearFavs);

    // Event listener for search bar
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("click", () => {
        handleSearch(searchInput);
    });

    // Initialize the favorite list on reload
    LS.initializeFavList();
    tb.buildTargetListeners();
})

function showAllChars(){
    tb.showAll();
}

function refreshData(){
    let refresh = true;
    tb.showAll(refresh);
}

function clearFavs(){
    window.localStorage.removeItem('favList');
    document.getElementById("fav-list").innerHTML = '';
    let favTiles = document.querySelectorAll(".fav");
    for (let i = 0; i < favTiles.length; i++){
        favTiles[i].classList.remove("fav");
    }
    LS.initializeFavList();
}

function handleSearch(inputElement){
    inputElement.addEventListener("keypress", async (event) => {
        if (event.code == 'Enter' && inputElement.value != ''){
            const tileGrid = document.getElementById("tile-grid")
            const searchValue = inputElement.value;
            inputElement.value = '';
            const results = await charAPI.searchByName(searchValue);
            // console.log(`Search for ${searchValue} returned:`, results);
            if (results.length > 0){
                tb.buildColumnGrids(results, tileGrid);
            }
            else {
                tileGrid.innerHTML = '';
                let p = document.createElement('p');
                p.textContent = 'No Results';
                p.classList.add('message');
                tileGrid.append(p);
            }
        }
    });
}

