import {CharacterAPI} from './characterAPI.js';
const charAPI = new CharacterAPI();

export class TileBuilder{
    constructor(){
        this.test = 'blah';
    };

    async showAll(){
        let container = document.getElementById('tile-grid');
        container.innerHTML = `
            <p class="loading message">Loading <i class="icofont-spinner-alt-3"></i></p>
        `;
        let charList = await charAPI.getAllCharacters();
        this.buildColumnGrids(charList, container);
    }

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

    buildTiles(charList, container) {      
        for (let i in charList){
            let curChar = charList[i]
            // console.log("Building tile for", curChar);
            this.renderTile(curChar, container);
        }
    }

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
        container.appendChild(tile);
        tile.addEventListener("click", () => this.selectUniverse(charData));
    }

    buildAccordions(){
        const accordions = document.querySelectorAll('.accordion');
    
        accordions.forEach((accordion) => {
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

    buildFavListeners(){
        const stars = document.querySelectorAll(".star");
        const favBtns = document.querySelectorAll(".fav-btn");
        
        for (let i = 0; i < stars.length; i++){
            let curStar = stars[i];
            let curFavBtn = favBtns[i];

            curFavBtn.addEventListener("click", () => {
                curStar.classList.toggle('fav');
            })
        } 
    }

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
