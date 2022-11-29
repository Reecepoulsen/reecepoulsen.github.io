window.addEventListener("load", (event) => {
    /**************************************************
    * Get the forecast for today 
    **************************************************/
    const curForecastURL = 'https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=96f881dc52b0a77480e60ae03cff87e0&units=imperial'

    fetch(curForecastURL)
    .then((response) => {
        return response.json()
    })
    .then((curForecastData) =>{
        
        // Get HTML elements
        let temp = document.getElementById('curr-temp-num')
        let high = document.getElementById('high-num')
        let low = document.getElementById('low-num')
        let windSpeed = document.getElementById('wind-speed-num')
        let humidity = document.getElementById('humidity-num')
        
        // create checkpoints
        const main = curForecastData.main
        const wind = curForecastData.wind

        // set the contents to the data received from weather API
        temp.innerHTML = Math.round(main.temp)
        high.innerHTML = Math.round(main.temp_max)
        low.innerHTML = Math.round(main.temp_min)
        windSpeed.innerHTML = Math.round(wind.speed)
        humidity.innerHTML = main.humidity


        // Calculate the wind chill based off of other values
        const calcWindChill = (temperature, speed) => {
            return (temperature <= 50 && speed > 3)
            ?
                Math.round(
                    35.74 + (.6215 * temperature) - (35.75 * Math.pow(speed, .16)) 
                    + (.4275 * (temperature * Math.pow(speed, .16)))
            ,):
                Math.round(main.temp);
        }
        
        const displayWindChill = () => {
            let temperature = Number(document.getElementById("curr-temp-num").textContent || 0);
            let wind = Number(document.getElementById("wind-speed-num").textContent || 0);
            let result = calcWindChill(temperature, wind);
            document.getElementById("wind-chill-num").innerHTML = result;
        }
        
        displayWindChill();
    })

    /**************************************************
    * Get the forecast for next 5 days
    **************************************************/
    const fiveDayURL = 'https://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=96f881dc52b0a77480e60ae03cff87e0&units=imperial'

    fetch(fiveDayURL)
    .then((response) => {
        return response.json()
    })
    .then((fiveDayData) => {
        // dayList contains forecast every 3 hrs for the 5 days
        let dayList = fiveDayData.list

        // filter the dayList so we only get the forecast @18:00:00 time
        filteredDayList = dayList.filter(day => day.dt_txt.includes('18:00:00'))

        // Create a forecast for each day in the filtered list
        for (let i = 0; i < filteredDayList.length; i++) {

            // set checkpoint for the current day 
            let curDay = filteredDayList[i]

            // make the HTML elements
            let dayName = document.createElement('h5')
            let dayImg = document.createElement('img')
            let dayTemp = document.createElement('span')

            /*************Process data to get day name*************/
            let dateTimeString = curDay.dt_txt
            let stringList = dateTimeString.split(" ")
            let dateStringUnformatted = stringList[0]

            let dateStringParts = dateStringUnformatted.split('-')
            let formatedDate = new Date(+dateStringParts[0], +dateStringParts[1] - 1, +dateStringParts[2])

            let dayNum = formatedDate.getDay()
            switch(dayNum) {
                case 0:
                    dayName.innerHTML = 'Sun'
                    break;
                case 1:
                    dayName.innerHTML = 'Mon'
                    break;
                case 2:
                    dayName.innerHTML = 'Tues'
                    break;
                case 3:
                    dayName.innerHTML = 'Wed'
                    break;
                case 4:
                    dayName.innerHTML = 'Thur'
                    break;
                case 5:
                    dayName.innerHTML = 'Fri'
                    break;
                case 6:
                    dayName.innerHTML = 'Sat'
                    break;
            }

            // Set the source for the day image 
            let iconId = curDay.weather[0].icon
            dayImg.src = `http://openweathermap.org/img/wn/${iconId}.png`

            // Set the value for the day temp
            dayTemp.innerHTML = Math.round(curDay.main.temp) + "°F"
            
            // Add created elements into appropriate spot in HTML document
            let containerId = "forecast-day" + (i + 1)
            let container = document.getElementById(containerId)
            container.appendChild(dayName)
            container.appendChild(dayImg)
            container.appendChild(dayTemp)
        }
    })
})    

