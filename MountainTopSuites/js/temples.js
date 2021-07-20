fetch("../js/temples.json")
.then(response => {
    return response.json()
})
.then(templesList => {
    console.table(templesList)

    let numTemples = templesList.length
    console.log(numTemples)

    for (let i = 0; i < numTemples; i++) {
        let curTemple = templesList[i]
        let container = document.getElementById(`box${i+1}-content`);

        // Create elements
        let contactContainer = document.createElement('div')
        let contactHeader = document.createElement('h4')
        let contactUl = document.createElement('ul')
        let address = document.createElement('li')
        let street = document.createElement('span')
        let city = document.createElement('span')
        let stateProvince = document.createElement('span')
        let zipPostal = document.createElement('span')
        let country = document.createElement('span')
        let phone = document.createElement('li')

        contactHeader.innerHTML = "Temple Contact Info"

        // get address data
        street.innerHTML = `${curTemple['address']['street']}, `
        city.innerHTML = ` ${curTemple['address']['city']}, `
        stateProvince.innerHTML = ` ${curTemple['address']['state_province']} <br>`
        zipPostal.innerHTML = `${curTemple['address']['zip_postal']}`
        country.innerHTML = ` ${curTemple['address']['country']} `

        // add them into the address container
        address.appendChild(street)
        address.appendChild(city)
        address.appendChild(stateProvince)
        if (zipPostal.innerHTML != 'None'){
            address.appendChild(zipPostal)
        }
        address.appendChild(country)

        // get other contact data
        phone.innerHTML = curTemple['telephone']

        // add them all into the contactUl
        contactUl.appendChild(address)
        contactUl.appendChild(phone)

        // add the header and the contactUl to the container
        contactContainer.appendChild(contactHeader)
        contactContainer.appendChild(contactUl)
        container.appendChild(contactContainer)


        // create status, services, session schedule, open Schedule, closure schedule
        let statusContainer = document.createElement('div')
        let status = document.createElement('p')
        status.innerHTML = curTemple['status']
        statusContainer.appendChild(status)
        container.appendChild(statusContainer)
        
        // handle the services section
        let servicesContainer = document.createElement('div')
        let servicesHeader = document.createElement('h4')
        let servicesUl = document.createElement('ul')

        servicesHeader.innerHTML = 'Services'
        let services = curTemple['services']
        services.forEach(item => {
            let service = document.createElement('li')
            service.innerHTML = item
            servicesUl.appendChild(service)
        })

        servicesContainer.appendChild(servicesHeader)
        servicesContainer.appendChild(servicesUl)
        container.appendChild(servicesContainer)


        // handle the session section
        let sessionContainer = document.createElement('div')
        let sessionHeader = document.createElement('h4')
        let sessionSched = document.createElement('p')

        sessionHeader.innerHTML = 'Sessions'
        sessionSched.innerHTML = curTemple['session_sched']
        sessionContainer.appendChild(sessionHeader)
        sessionContainer.appendChild(sessionSched)
        container.appendChild(sessionContainer)

        // handle the open section
        let openContainer = document.createElement('div')
        let openHeader = document.createElement('h4')
        let openUl =document.createElement('ul')
        
        openHeader.innerHTML = "Open"
        let daysOpen = curTemple['weekly_sched']
        for (let d = 0; d < daysOpen.length; d++){
            let day = document.createElement('li')
            day.innerHTML = daysOpen[d]
            openUl.appendChild(day)
        }

        openContainer.appendChild(openHeader)
        openContainer.appendChild(openUl)
        container.appendChild(openContainer)

        // handle the closed section
        let closedContainer = document.createElement('div')
        let closedHeader = document.createElement('h4')


        closedHeader.innerHTML = "Closures"
        closedContainer.appendChild(closedHeader)

        let years = curTemple['closure_sched']
        for (let y = 0; y < years.length; y++){
            let year = document.createElement('p')
            year.innerHTML = years[y]['year']
            closedContainer.appendChild(year)

            let datesUl = document.createElement('ul')
            let closureList = years[y]['dates']
            closureList.forEach(item => {
                let day = document.createElement('li')
                day.innerHTML = item
                datesUl.appendChild(day)
            });
            closedContainer.appendChild(datesUl)
        }
        container.appendChild(closedContainer)

        // create history => announced, groundbreaking, dedicated, rededicated?
        let historyContainer = document.createElement('div')
        let historyHeader = document.createElement('h4')
        let historyUl = document.createElement('ul')
        let announced = document.createElement('li')
        let groundbreaking =document.createElement('li')
        let dedicated = document.createElement('li')
        let rededicated = document.createElement('li')

        historyHeader.innerHTML = 'Temple History'
        announced.innerHTML = `Announced: ${curTemple['history']['announced']}`
        groundbreaking.innerHTML = `Groundbreaking: ${curTemple['history']['groundbreaking']}`
        dedicated.innerHTML = `Dedicated: ${curTemple['history']['dedicated']}`
        rededicated.innerHTML = `Rededicated: ${curTemple['history']['rededicated'][0]}`

        historyUl.appendChild(announced)
        historyUl.appendChild(groundbreaking)
        historyUl.appendChild(dedicated)
        if (curTemple['history']['rededicated'].length >= 1){
            historyUl.appendChild(rededicated)
        }


        historyContainer.appendChild(historyHeader)
        historyContainer.appendChild(historyUl)
        container.appendChild(historyContainer)

        // assign classes to containers
        contactContainer.classList.add('container', 'contact-container')
        statusContainer.classList.add('container', 'status-container')
        servicesContainer.classList.add('container', 'services-container')
        sessionContainer.classList.add('container', 'session-container')
        openContainer.classList.add('container', 'open-container')
        closedContainer.classList.add('container', 'closed-container')
        historyContainer.classList.add('container', 'history-container')
    }
})

