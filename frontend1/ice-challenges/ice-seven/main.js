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
        let location = eventInfo.location
        let organizedBy = eventInfo.organized_by
        let sum = eventInfo.summary
        let url = eventInfo.url

        // change the content of the element to match the data 
        eventType_container.textContent = eventType
        name_container.textContent = name
        location_container.textContent = location
        organizedBy_container.textContent = organizedBy
        sum_container.textContent = sum
        url_container.textContent = url
        url_container.href = url
        url_container.target = "blank"

        // handle dates and time
        let startDateTimeString = eventInfo.start
        let endDateTimeString = eventInfo.end

        let startDateTimeStringParts = startDateTimeString.split(" ")
        let endDateTimeStringParts = endDateTimeString.split(" ")

        let startDate = startDateTimeStringParts[0]
        let startTime = startDateTimeStringParts[1]
        let endTime = endDateTimeStringParts[1]

        let date_container = document.getElementById(`date${i + 1}`)
        let start_container = document.getElementById(`startTime${i + 1}`)
        let end_container = document.getElementById(`endTime${i + 1}`)

        date_container.textContent = startDate.slice(5, 10)
        start_container.textContent = startTime.slice(0, 5)
        end_container.textContent = endTime.slice(0, 5)

    }
})

