window.addEventListener("load", (event) => {
    requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json'

    fetch(requestURL)
    .then(function (response) {
        return response.json()
    })
    .then(function (town_data) {
        let towns = town_data.towns

        for (let i = 0; i < towns.length; i++){
            if (towns[i].name == 'Preston' || towns[i].name == 'Soda Springs' || towns[i].name == 'Fish Haven'){
                // set the town checkpoint 
                let town = towns[i]

                // create a townSection to hold everything 
                let townSection = document.createElement('section')

                // create a container for the text for grid simplicity
                let textContainer = document.createElement('div')
                textContainer.className = "text-container"

                // create the HTML elements
                let name = document.createElement('h3')
                let motto = document.createElement('p')
                let year = document.createElement('p')
                let pop = document.createElement('p')
                let rain = document.createElement('p')
                let image = document.createElement('img')

                // assign the name of the town to the townSection id
                townSection.id = town.name

                // set the content of each element
                name.innerHTML = town.name
                motto.innerHTML = town.motto
                year.innerHTML = 'Year Founded: ' + town.yearFounded
                pop.innerHTML = 'Population: ' + town.currentPopulation
                rain.innerHTML = 'Annual Rain Fall: ' + town.averageRainfall
                image.src = 'images/' + town.photo

                // add all of the text elements into the text-container
                textContainer.appendChild(name)
                textContainer.appendChild(motto)
                textContainer.appendChild(year)
                textContainer.appendChild(pop)
                textContainer.appendChild(rain)

                // add the textContainer and the image into the townSection
                townSection.append(textContainer)
                townSection.appendChild(image)

                // add the townSection container to the page
                let regionSection = document.getElementById('region-container')
                regionSection.appendChild(townSection)
            }
        }
    })
})