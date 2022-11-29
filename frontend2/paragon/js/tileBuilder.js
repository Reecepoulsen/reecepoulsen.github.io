import {CharacterAPI} from './characterAPI.js';
import { ParagonLS } from './localStorage.js';

/************************************************************ 
* This class handles building and interacting with
* tiles 
************************************************************/
export class TileBuilder{
    constructor(){
        this.charAPI = new CharacterAPI();
        this.LS = new ParagonLS();
        this.favSet = this.LS.initializeFavList();
    };

    /************************************************************ 
    * Gets all results from api and builds tiles for them
    ************************************************************/
    async showAll(refresh=false){
        let container = document.getElementById('tile-grid');
        container.innerHTML = `
            <p class="loading message">Loading <i class="icofont-spinner-alt-3"></i></p>
        `;

        await this.LS.createCharacterCatalog(refresh);
        let charList = this.LS.getValue('catalog');
        this.buildColumnGrids(charList, container);
    }

    /************************************************************ 
    * Builds two seperate column grids that live next to each
    * other in the same parent grid container.
    * This allows one grid to expand freely from the other
    ************************************************************/
    buildColumnGrids(charList, container){
        container.innerHTML = '';
        let leftList = [];
        let rightList = [];
        
        let leftColumn = document.createElement('div');
        let rightColumn = document.createElement('div');
        
        let listOptions = [leftList, rightList];
        let columnList = [leftColumn, rightColumn];
    
        let l = 0;
        for (let i in charList) {
            let curList = listOptions[l];
            curList.push(charList[i]);
            l = (l + 1) % 2;
        }
        
        for (let j in columnList){
            let curContainer = columnList[j];
            curContainer.classList.add('column');
            this.buildTiles(listOptions[j], curContainer);
            container.appendChild(curContainer);
        }
        this.buildAccordions();
        this.buildFavListeners();
    }

    /************************************************************ 
    * Loops through a list of character objects and builds
    * a tile for each one
    ************************************************************/
    buildTiles(charList, container) {      
        for (let i in charList){
            let curChar = charList[i]
            this.renderTile(curChar, container);
        }
    }

    /************************************************************ 
    * Creates an HTMl element that represents a tile for the
    * Character it is given.
    ************************************************************/
    renderTile(charData, container){
        // console.log("Render Tile for: ", charData.name);
        let tile = document.createElement('div');
        tile.setAttribute("id", `${charData.id}-tile`)
        tile.classList.add("tile");
        tile.innerHTML = `
        <div class="tile_title accordion">
            <i class="star icofont-star"></i>
            <h3 class="tile_title-text">${charData.name}</h3>
            <i class="dropdown icofont-rounded-down"></i>
        </div>
        <div class="tile_content">
            <img class="tile_img" src="${charData.image.url}" alt="Picture of ${charData.name}" loading="lazy">
            <div class="tile_info">
                <div class="tile_info-biography">
                    <h3>Biography</h3>
                    <ul class="tile_info-list">
                        <li>Full Name: <span id="${charData.id}_name-inp" class="data-inp">${charData.biography['full-name']}</span></li>
                        <li>Alter Egos: <span id="${charData.id}_alterEgo-inp" class="data-inp">${charData.biography['alter-egos']}</span></li>
                        <li>Birth Place: <span id="${charData.id}_birthPlace-inp" class="data-inp">${charData.biography['place-of-birth']}</span></li>
                        <li>Alignment: <span id="${charData.id}_alignment-inp" class="data-inp">${charData.biography.alignment}</span></li>
                    </ul>
                </div>
                <div class="tile_info-stats">
                    <h3>Stats</h3>
                    <ul class="tile_info-list">
                        <li>Intelligence: <span id="${charData.id}_intelligence-inp" class="data-inp">${charData.powerstats.intelligence}</span></li>
                        <li>Strength: <span id="${charData.id}_strength-inp" class="data-inp">${charData.powerstats.strength}</span></li>
                        <li>Speed: <span id="${charData.id}_speed-inp" class="data-inp">${charData.powerstats.speed}</span></li>
                        <li>Durability: <span id="${charData.id}_durability-inp" class="data-inp">${charData.powerstats.durability}</span></li>
                        <li>Power: <span id="${charData.id}_power-inp" class="data-inp">${charData.powerstats.power}</span></li>
                        <li>Combat: <span id="${charData.id}_combat-inp" class="data-inp">${charData.powerstats.combat}</span></li>
                    </ul>
                </div>
            </div>
            <button class="fav-btn" type="button">Favorite</button>
        </div>
        `;
        tile.style.opacity = 0;
        tile.style.animation = "fade-in ease .4s";
        tile.style.opacity = 100;
        container.appendChild(tile);

        // If a tile is clicked on, choose the appropriate universe
        tile.addEventListener("click", () => this.selectUniverse(charData));
    }

    /************************************************************ 
    * Attaches accordion functionality once every tile is
    * built
    ************************************************************/
    buildAccordions(){
        const accordions = document.querySelectorAll('.accordion');
    
        accordions.forEach((accordion) => {
            // Important for propogating fav star
            this.recreateFavorites(accordion);

            accordion.addEventListener('click', () => {
                accordion.classList.toggle('open-accordion');
                if (accordion.classList.contains('open-accordion')){
                    accordion.nextElementSibling.style.display = `grid`;
                    accordion.nextElementSibling.style.maxHeight = 'fit-content';
                    accordion.children[2].classList.add("icofont-rotate-180")
                }
                else{
                    accordion.nextElementSibling.style.display = `none`;
                    accordion.nextElementSibling.style.maxHeight = '0px';
                    accordion.children[2].classList.remove("icofont-rotate-180")
                }
            })
        });
    }

    /************************************************************ 
    * Helper for accordions, toggle expand or collapse all
    ************************************************************/
    expandOrCollapseAll(command){
        let displayType = 'grid';
        let height = 'fit-content'
        let flip = false;
    
        if (command == "collapse"){
            displayType = 'none';
            height = '0px';
            flip = true;
        }
    
        let accordions = document.getElementsByClassName("accordion");
        for (let a = 0; a < accordions.length; a++){
            let curAccordion = accordions[a];
            curAccordion.nextElementSibling.style.display = displayType;
            curAccordion.nextElementSibling.style.maxHeight = height;
            flip ? curAccordion.children[2].classList.remove("icofont-rotate-180") :  
                   curAccordion.children[2].classList.add("icofont-rotate-180");
        }
    }


    /************************************************************ 
    * attaches an event listener to each tile's favorite
    * button
    ************************************************************/
    buildFavListeners(){
        const stars = document.querySelectorAll(".star");
        const favBtns = document.querySelectorAll(".fav-btn");
        
        for (let i = 0; i < stars.length; i++){
            let curStar = stars[i];
            let curFavBtn = favBtns[i];

            curFavBtn.addEventListener("click", (event) => {
                this.handleFavorites(curFavBtn, curStar);
            })
        } 
    }

    /************************************************************ 
    * Handles if someone favorites a character. Uses a set
    * to determine if it should add or remove from fav list
    ************************************************************/
    handleFavorites(curFavBtn, curStar){
        let charName = curFavBtn.parentElement.previousElementSibling.children[1].textContent
        let charId = curFavBtn.parentElement.parentElement.id.split("-")[0]

        if (this.favSet.has(charId) == false){
            curStar.classList.add('fav');
            this.favSet.add(charId);

            let li = this.renderFavorite(charId, charName)

            document.getElementById('fav-list').append(li);
            this.LS.updateFavList("add", charId, charName);
        }
        else {
            curStar.classList.remove('fav');
            this.favSet.delete(charId);
            document.getElementById(`${charId}-fav-link`).remove();
            this.LS.updateFavList("delete", charId, charName);
        }

    }

    renderFavorite(charId, charName){
        let li = document.createElement('li');
        li.setAttribute("id", `${charId}-fav-link`);
        li.setAttribute("class", "fav-link");
        li.innerHTML = `<a>${charName}</a>`;
        li.addEventListener("click", async () => this.targetFavorite(charId))
        return li
    }

    buildTargetListeners(){
        let favorites = document.querySelectorAll(".fav-link");
        for (let i = 0; i < favorites.length; i++){
            // console.log(favorites[i]);
            favorites[i].addEventListener("click", () => {
                let id = favorites[i].id.split("-")[0];
                this.targetFavorite(id);
            });
        }
    }

    /************************************************************ 
    * Restars all favorites after each rebuild of tile-grid
    ************************************************************/
    recreateFavorites(tileTitle){
        let charId = tileTitle.parentElement.id.split("-")[0];
        if (this.favSet.has(charId)){
            // console.log("rebuild for:", charId);
            tileTitle.children[0].classList.toggle('fav');
        }
    }

    /************************************************************ 
    * If someone clicks a favorite link, it will search for
    * that character specifically
    ************************************************************/
    async targetFavorite(charId){
        let container = document.getElementById('tile-grid');
        let result = await this.charAPI.searchById(charId);
        // console.log(result);
        this.buildColumnGrids([result], container);
        this.expandOrCollapseAll();
    }


    /************************************************************ 
    * If a user clicks on a tile, this will display the correct
    * universe for that character
    ************************************************************/
    selectUniverse(charData){
        // console.log("Select universe for:", charData);
        document.getElementById("marvel").classList.remove("selected-universe")
        document.getElementById("dc").classList.remove("selected-universe")
        document.getElementById("other").classList.remove("selected-universe")

        if (charData.biography.publisher == "Marvel Comics"){
            document.getElementById("marvel").classList.add("selected-universe")
        }
        else if (charData.biography.publisher == "DC Comics"){
            document.getElementById("dc").classList.add("selected-universe")
        }
        else {
            document.getElementById("other").classList.add("selected-universe")
        }
    }  
}