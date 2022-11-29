const todayURL = 'https://api.openweathermap.org/data/2.5/weather?zip=83440&appid=96f881dc52b0a77480e60ae03cff87e0&units=imperial'
fetch(todayURL)
.then(response => {return response.json()})
.then(todayData => {
    let description = document.getElementById('description')
    let temp = document.getElementById('temp')

    let descString = todayData.weather[0].description
    let capDescString = descString.charAt(0).toUpperCase() + descString.slice(1)
    description.innerHTML = capDescString
    temp.innerHTML = Math.round(todayData.main.temp) + '°'
})



const fiveDayURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=83440&appid=96f881dc52b0a77480e60ae03cff87e0&units=imperial'
fetch(fiveDayURL)
.then((response) => {
    return response.json()
})
.then((fiveDayData) => {
    // grabbing the list
    let fiveDayList = fiveDayData.list

    // filter the list 
    let filteredList = fiveDayList.filter(day => day.dt_txt.includes("18:00:00"))

    // create each days forecast
    // loop
    for (let i = 0; i < filteredList.length; i++) {
        let curDay = filteredList[i]

        let name = document.createElement("h3")
        let temp = document.createElement("span")
        let icon = document.createElement("img")

        // get the whole date time string
        let dateTimeString = curDay.dt_txt

        // break it into date and time 
        let dateTimeParts = dateTimeString.split(" ")

        // grab just the date
        let dateStringRaw = dateTimeParts[0]

        // break the date into parts [year, month, day]
        let dateStringParts = dateStringRaw.split('-')
        
        // Create a date object with correct format new Date(year, monthIndex, day)
        let date = new Date(dateStringParts[0], dateStringParts[1] - 1, dateStringParts[2])
        let dayNum = date.getDay()

        switch (dayNum) {
            case 0:
                name.innerHTML = "Sunday"
                break;
            case 1:
                name.innerHTML = "Monday"
                break;
            case 2:
                name.innerHTML = "Tuesday"
                break;
            case 3:
                name.innerHTML = "Wednesday"
                break;
            case 4:
                name.innerHTML = "Thursday"
                break;
            case 5:
                name.innerHTML = "Friday"
                break;
            case 6:
                name.innerHTML = "Saturday"
                break;
        }

        // set the temp
        let main = curDay.main
        temp.innerHTML = Math.round(main.temp_max) + '°'

        // set the icon
        let iconId = curDay.weather[0].icon
        icon.src = `http://openweathermap.org/img/wn/${iconId}.png`

        // append the children
        let containerId = 'day' + (i + 1)
        let container = document.getElementById(containerId)
        container.appendChild(name)
        container.appendChild(temp)
        container.appendChild(icon)
    }
})
