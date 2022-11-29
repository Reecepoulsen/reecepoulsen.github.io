const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';
fetch(requestURL)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    console.table(jsonObject);

    let prophets = jsonObject['prophets'];

    for (let i = 0; i < prophets.length; i++){

        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let birthDate = document.createElement('p');
        let birthPlace = document.createElement('p');
        let img = document.createElement('img')

        h2.textContent = prophets[i].name + ' ' + prophets[i].lastname;
        card.appendChild(h2);

        birthDate.textContent = `Date of Birth: ${prophets[i].birthdate}`;
        card.appendChild(birthDate);

        birthPlace.textContent = `Place of Birth: ${prophets[i].birthplace}`;
        card.appendChild(birthPlace)



        img.src = prophets[i].imageurl;
        card.appendChild(img);

        document.querySelector('div.cards').appendChild(card);
    }
});







