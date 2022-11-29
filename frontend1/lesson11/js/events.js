const townURL = 'https://byui-cit230.github.io/weather/data/towndata.json'

fetch(townURL)
.then(response => {
    return response.json()
})
.then(data => {
    let towns = data.towns

    let eventSection = document.getElementById('events-container')

    for (let i = 0; i < towns.length; i++){
        let curTown = towns[i]

        if (curTown.name == 'Preston' || curTown.name == 'Soda Springs' || curTown.name == 'Fish Haven'){
            let townEventsContainer = document.createElement('div')
            townEventsContainer.classList.add('townEvents')
            let townEventsHeader = document.createElement('h3')

            townEventsHeader.innerHTML = curTown.name

            townEventsContainer.appendChild(townEventsHeader)

            let townEvents = curTown.events
            for (let e = 0; e < townEvents.length; e++){
                let curEvent = townEvents[e]

                let event = document.createElement('p')

                event.innerHTML = curEvent
                townEventsContainer.appendChild(event)
            }

            eventSection.appendChild(townEventsContainer)
        }
    }
})