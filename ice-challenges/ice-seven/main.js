const requestURL = 'https://www.ahfx.com/events.php'

fetch(requestURL)
.then(response => {
    return response.json()
})
.then(dataList => {

    console.log(dataList.length)
    for (let i = 0; i < dataList.length; i++) {
    //  create the HTML elements
    let eventType_container = document.getElementById(`eventtype${i + 1}`)
    let name_container = document.getElementById(`eventName${i + 1}`)
    // let start_container = document.getElementById()
    // let end_container = document.getElementById()
    let location_container = document.getElementById(`location${i + 1}`)
    let organizedBy_container = document.getElementById(`organized${i + 1}`)
    let sum_container = document.getElementById(`summary${i + 1}`)
    let url_container = document.getElementById(`moreInfo${i + 1}`)

    //  set some checkpoints
    let curEvent = dataList[i]
    let eventInfo = curEvent.properties

    //  store the data from the json
    let eventType = curEvent.type
    let name = eventInfo.name
    let start = eventInfo.start
    let end = eventInfo.end
    let location = eventInfo.location
    let organizedBy = eventInfo.organized_by
    let sum = eventInfo.summary
    let url = eventInfo.url

    // change the content of the element to match the data 
    eventType_container.innerHTMl = eventType
    name_container.innerHTMl = name
    // start_container.innerHTMl = start
    // end_container.innerHTMl = end
    location_container.innerHTMl = location
    organizedBy_container.innerHTMl = organizedBy
    sum_container.innerHTMl = sum
    url_container.innerHTMl = url

    // append them to the document
    let eventContainer = document.getElementById(`card${i + 1}`)

    eventContainer.appendChild(eventType_container)
    eventContainer.appendChild(name_container)
    eventContainer.appendChild(start_container)
    eventContainer.appendChild(end_container)
    eventContainer.appendChild(location_container)
    eventContainer.appendChild(organizedBy_container)
    eventContainer.appendChild(sum_container)
    eventContainer.appendChild(url_container)
    }
})