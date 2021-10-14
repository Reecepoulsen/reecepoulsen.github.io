import Hikes from './hikes.js';

const hikeList = [
    {
      name: "Bechler Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description:
        "Beautiful short hike along the Bechler river to Bechler Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
    },
    {
      name: "Teton Canyon",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description: "Beautiful short (or long) hike through Teton Canyon.",
      directions:
        "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
      name: "Denanda Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "7 miles",
      difficulty: "Moderate",
      description:
        "Beautiful hike through Bechler meadows river to Denanda Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
    }
];

window.addEventListener("load", main())
  
function main() {
    const hikes = new Hikes(hikeList);
    
    hikes.showHikeList();
}

const btn1 = document.getElementById("more-btn-1")
const btn2 = document.getElementById("more-btn-2")
const btn3 = document.getElementById("more-btn-3")

btn1.addEventListener("click", function(){ showMoreInfo(hikeList[0], 0); });
btn2.addEventListener("click", function(){ showMoreInfo(hikeList[1], 1); });
btn3.addEventListener("click", function(){ showMoreInfo(hikeList[2], 2); });

function showMoreInfo(hike, counter) {
    const container = document.createElement('div');
    const descP = document.createElement('p');
    const instructionsP = document.createElement('p');

    container.setAttribute("class", "moreInfo");
    descP.setAttribute("class", "description");
    instructionsP.setAttribute("class", "instructions")

    descP.textContent = hike.description;
    instructionsP.textContent = hike.directions;

    container.append(descP);
    container.append(instructionsP);
    const parentId = `grid${counter + 1}`;
    document.getElementById(parentId).append(container);
}