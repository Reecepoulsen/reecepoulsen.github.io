
export default class Hikes {

    constructor (hikeList){
        this.hikeList = hikeList;
    }

    showHikeList() {
        const hikeListElement = document.getElementById("hikes");
      hikeListElement.innerHTML = "";
      Hikes.renderHikeList(this.hikeList, hikeListElement);
    }
    
    static renderHikeList(hikes, parent) {
        let counter = 1
      hikes.forEach(hike => {
          parent.appendChild(Hikes.renderOneHike(hike, counter));
        counter += 1;
      });
    }

    static renderOneHike(hike, counter) {
      const item = document.createElement("li");
      
      item.innerHTML = `
            <h2 class="header">${hike.name}</h2>
            <div class="grid-container" id="grid${counter}">
                <div class="image"><img src="//byui-cit.github.io/cit261/examples/${hike.imgSrc}" alt="${hike.imgAlt}"></div>
                <div class="info">
                <div>
                            <h3>Distance</h3>
                            <p>${hike.distance}</p>
                        </div>
                        <div>
                        <h3>Difficulty</h3>
                            <p>${hike.difficulty}</p>
                            </div>
                            <button id="more-btn-${counter}">More Info...</button>
                            </div>
            </div>`;
      return item;
    }

    
}








