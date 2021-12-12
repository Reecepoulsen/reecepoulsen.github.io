import {CharacterAPI} from './characterAPI.js';
import {TileBuilder} from './tileBuilder.js';

const charAPI = new CharacterAPI();
const tb = new TileBuilder();

window.addEventListener("load", async () => {
    document.getElementById("show-all-btn").addEventListener("click", showAllChars);
    document.getElementById("show-all-link").addEventListener("click", showAllChars);
    document.getElementById("expand-link").addEventListener("click", () => {
        tb.expandOrCollapseAll('expand');
    });
    document.getElementById("collapse-link").addEventListener("click", () => {
        tb.expandOrCollapseAll('collapse');
    });
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("click", () => {
        handleSearch(searchInput);
    });
    
})

function showAllChars(){
    tb.showAll()
}

function handleSearch(inputElement){
    inputElement.addEventListener("keypress", async (event) => {
        if (event.code == 'Enter' && inputElement.value != ''){
            const tileGrid = document.getElementById("tile-grid")
            const searchValue = inputElement.value;
            inputElement.value = '';
            const results = await charAPI.searchByName(searchValue);
            console.log(`Search for ${searchValue} returned:`, results);
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

