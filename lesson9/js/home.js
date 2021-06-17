window.addEventListener("load", (event) => {
    const dataURL = "https://byui-cit230.github.io/weather/data/towndata.json"

    fetch(dataURL)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        // Get preston HTML elements
        let preston_motto = document.getElementById("preston-motto")
        let preston_year = document.getElementById("preston-year")
        let preston_pop = document.getElementById("preston-pop")
        let preston_rain = document.getElementById("preston-rain")
 
        // Get fish haven HTML elements
        let fish_motto = document.getElementById("fish-motto")
        let fish_year = document.getElementById("fish-year")
        let fish_pop = document.getElementById("fish-pop")
        let fish_rain = document.getElementById("fish-rain")

        // Get soda springs HTML elements
        let soda_motto = document.getElementById("soda-motto")
        let soda_year = document.getElementById("soda-year")
        let soda_pop = document.getElementById("soda-pop")
        let soda_rain = document.getElementById("soda-rain")

        // Set checkpoint
        preston = data['towns'][6]
        fishHaven = data['towns'][2]
        sodaSprings = data['towns'][0]

        // Set preston content
        preston_motto.innerHTML = preston['motto']
        preston_year.innerHTML = preston['yearFounded']
        preston_pop.innerHTML = preston['currentPopulation']
        preston_rain.innerHTML = preston['averageRainfall']

        // Set fish haven content
        fish_motto.innerHTML = fishHaven['motto']
        fish_year.innerHTML = fishHaven['yearFounded']
        fish_pop.innerHTML = fishHaven['currentPopulation']
        fish_rain.innerHTML = fishHaven['averageRainfall']

        // Set soda springs
        soda_motto.innerHTML = sodaSprings['motto']
        soda_year.innerHTML = sodaSprings['yearFounded']
        soda_pop.innerHTML = sodaSprings['currentPopulation']
        soda_rain.innerHTML = sodaSprings['averageRainfall']
    })
})