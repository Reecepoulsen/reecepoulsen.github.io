window.addEventListener("load", () => {
    const calcWindChill = (temperature, speed) => {
        return (temperature <= 50 && speed > 3)
        ?
            Math.round(
                35.74 + (.6215 * temperature) - (35.75 * Math.pow(speed, .16)) 
                + (.4275 * (temperature * Math.pow(speed, .16)))
        ,):
            "N/A";
    }

    const displayWindChill = () => {
        let temperature = Number(document.getElementById("curr-temp-num").textContent || 0);
        let wind = Number(document.getElementById("wind-speed-num").textContent || 0);
        let result = calcWindChill(temperature, wind);
        document.getElementById("wind-chill-num").innerHTML = result;
    }

    displayWindChill();
})
