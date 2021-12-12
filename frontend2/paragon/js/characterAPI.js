const TOKEN = 1094500731363376;
const BASEURL = `https://superheroapi.com/api.php/${TOKEN}/`;

const idSet = new Set(['166', '179', '254'])

export class CharacterAPI{
    constructor(){
        this.characterCount = 731;
        // this.characterCount = 25;
    };

    async searchById(id, retry=0){
        let response = await this.getJSON(BASEURL + id);
        // console.log(`response for ${id} is: `, response)
        if (response != undefined){
            if (response.response == 'error' && retry <= 5){
                console.log(`retry #${retry} for: `, id)
                response = await this.searchById(id, retry + 1);
                console.log(`new response for ${id} is: `, response.response)
            }
        }
        return response;
    }

    async searchByName(name) {
        let results = [];
        let response = await this.getJSON(BASEURL + `search/${name}`);
        for (let i in response.results){
            let char = response.results[i];
            if (char.appearance.gender != "Female" && idSet.has(char.id) == false) {
                    results.push(char);
            }
        }
        return results;
    }

    async getJSON(url){
        try{
            const response = await fetch(url);
            if (!response.ok){
                throw Error(response.statusText);
            } 
            else {
                return response.json();
            }
        }
        catch(e){
            console.log(e.message);
        }
    }

    async getAllCharacters(){
        let threads = [];
        let results = [];

        for (let i = 1; i <= this.characterCount; i++){
            let thread = this.searchById(i)
            threads.push(thread);
        };
        
        for(let t in threads){
            let char = await threads[t];
            if (char != undefined){
                if (char.appearance.gender != "Female" && idSet.has(char.id) == false){
                    results.push(char);
                }
            }
        };
        console.log(results)
        return results;
    }

}