import { CharacterAPI } from "./characterAPI.js";

/************************************************************ 
* Local storage used to preserve state of fav list and 
* increase catalog performance by reducing the need for 
* API calls
************************************************************/
export class ParagonLS{
    constructor() {
        this.LS = window.localStorage; 
        this.charAPI = new CharacterAPI();
    }

    /************************************************************ 
    * Helper functions for working with LS
    ************************************************************/
    keyExists(key){
        return (this.LS.getItem(key) !== null)
    }

    getValue(key){
        return JSON.parse(this.LS.getItem(key));
    }

    setValue(key, value){
        this.LS.setItem(key, JSON.stringify(value));
    }

    /************************************************************ 
    * Creates a new character catalog from API in LS on first 
    * time or when it is told to refresh  
    ************************************************************/
    async createCharacterCatalog(refresh){
        if (refresh){
            this.LS.removeItem('catalog')
        }

        if (this.keyExists("catalog") == false){
            this.setValue("catalog", ["empty"]);
            // console.log("catalog didn't exist, created it as:", this.getValue('catalog'));
        }
        // console.log("catalog exists, it is:", this.getValue('catalog'));

        let catalogObj = this.getValue('catalog');

        if (catalogObj[0] == "empty"){
            let charList = await this.charAPI.getAllCharacters();
            this.setValue('catalog', charList);
            // console.log("catalog is now:", this.getValue('catalog'))
        }
    }
    
    /************************************************************ 
    * Reads favorite list from LS and renders each list item
    * Returns an idSet for the tileBuilder to initialize
    * off of 
    ************************************************************/
    initializeFavList(){
        if (this.keyExists("favList") == false){
            this.setValue("favList", []);
            // console.log("favList didn't exist, created it as:", this.getValue('favList'));
        }
 
        let idSet = new Set();
        let favListObj = this.getValue('favList');
        let ul = document.getElementById("fav-list");
        ul.innerHTML = '';
        
        for (let i in favListObj){
            let curFav = favListObj[i]
            // console.log(curFav);
            let li = document.createElement("li");
            let a = document.createElement("a");
 
            idSet.add(curFav.id);
 
            li.setAttribute("id", `${curFav.id}-fav-link`);
            li.setAttribute("class", "fav-link");
            a.textContent = curFav.name;
            li.append(a);
            ul.appendChild(li);
        }
        return idSet;
    }

    /************************************************************ 
    * Used to add and remove characters from favorite list
    * in LS 
    ************************************************************/
    updateFavList(command, charId, charName){
        let favListObj = this.getValue('favList');
        if (command == 'add'){
            favListObj.push({"id": charId, "name": charName});
            this.setValue('favList', favListObj);
        }
        else if (command == 'delete'){
            let filteredList = favListObj.filter((char) => {return char.id != charId;})
            this.setValue('favList', filteredList);
        }
    }
}
