const URL = "https://swapi.dev/api/people/";
let COUNT = 1;

async function getNewPage(num, key){
    if (COUNT + num <= 0 || COUNT + num > 9){
        console.log("can't do that")
        return 
    }

    newPeople = await fetchPeople(num);
    console.log(newPeople);

    if (key in newPeople) {
        renderPeopleList(newPeople);
    }
}

async function fetchPeople(num) {
    COUNT += num;
    const response = await fetch(URL + "?page=" + COUNT.toString());
    const people = await response.json();
    return people;
}


function renderPeopleList(peopleObj){
    document.getElementById('people-list').innerHTML = "";
    for (index in peopleObj['results']){
        let curPerson = peopleObj['results'][index]
        let li = document.createElement('li');
        li.setAttribute('id', curPerson.name);
        li.addEventListener("click", () => {
           ; showDetails(curPerson.name, peopleObj.results)
        })
        // li.setAttribute('onclick', showDetails(curPerson.name, peopleObj['results']));
        li.innerHTML = curPerson.name;
        document.getElementById("people-list").append(li);
    }
}

async function initialRender(){
    const response = await fetch(URL);
    const people = await response.json();
    renderPeopleList(people);
    showDetails("Luke Skywalker", people.results)
}

window.addEventListener('load', () => {
    document.getElementById("prev").addEventListener("click", async function(){
        await getNewPage( -1,'previous');
    });

    document.getElementById("next").addEventListener("click", async function(){
        await getNewPage( 1,'next');
    });

    initialRender();
})

async function showDetails(curPerson, peopleList) {
    for (index in peopleList) {
        let person = peopleList[index]
        if (curPerson == person.name) {    
            document.getElementById('anotherDiv').innerHTML =
            `<h2>${person.name} Details:</h2>
             <p>Birth Year: ${person.birth_year}</p>
             <p>Eye Color: ${person.eye_color}</p>
             <p>Gender: ${person.gender}</p>
             <p>Hair Color: ${person.hair_color}</p>
             <p>Height: ${person.height} cm</p>
             <p>Mass: ${person.mass} kg</p>
             <p>Skin Color: ${person.skin_color}</p>`
        } 
    }
}