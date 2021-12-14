/************************************************************ 
* Handls communication with the superhero api which can
* found at "https://superheroapi.com/". There are currently
* 731 entries, thus the characterCount in the constructor 
************************************************************/
export class CharacterAPI{
    constructor(){
        this.characterCount = 731;
        this.token = 1094500731363376;
        this.baseUrl = `https://superheroapi.com/api.php/${this.token}/`;
        this.extraFemaleIdSet = new Set(['166', '179', '254'])
    };

    /************************************************************ 
    * Sends a request to the API for a specific character 
    * by ID  
    ************************************************************/
    async searchById(id, retry=0){
        let response = await this.getJSON(this.baseUrl + id);
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

    /************************************************************ 
    * Sends a request to the API for a string to search.
    * The API responds with a list of results
    * Filters out all female characters to keep images 
    * appropriate
    ************************************************************/
    async searchByName(name) {
        let results = [];
        let response = await this.getJSON(this.baseUrl + `search/${name}`);
        for (let i in response.results){
            let char = response.results[i];
            if (char.appearance.gender != "Female" && this.extraFemaleIdSet.has(char.id) == false) {
                    results.push(char);
            }
        }
        return results;
    }

    /************************************************************ 
    * Sends a request and encodes the response as JSON  
    ************************************************************/
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

    /************************************************************ 
    * Starts a request for every ID and then waits for each
    * of them to finish. 
    * Filters out all female characters to keep images
    * appropriate
    ************************************************************/
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
                if (char.appearance.gender != "Female" && this.extraFemaleIdSet.has(char.id) == false){
                    results.push(char);
                }
            }
        };
        return results;
    }
}