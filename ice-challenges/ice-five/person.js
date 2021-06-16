window.addEventListener('load', (event) => {getPerson()})

function getPerson() { 
    // Get the image
    let image = document.getElementById("person-img")
    image.src = 'https://thispersondoesnotexist.com/image'
    
    // Get the person_data json object
    const requestURL = "https://www.ahfx.com/person.php"
    fetch(requestURL)
    .then(function (response) {
        return response.json()
    })
    .then(function (person_data) {
        // display the json object in a table for debugging
        console.table(person_data)

        // Get the elements
        let fullname = document.getElementById('fullname')
        let password = document.getElementById('password')
        let email = document.getElementById('email')
        let eyeColor = document.getElementById('eye-color')
        let cityCountry = document.getElementById('cityCountry')
        let children = document.getElementById("children")
        let ip = document.getElementById("ip")

        // create onject checkpoints
        let personal = person_data['person']['personal']
        let online_info = person_data['person']['online_info']
        let marriage = person_data['person']['marriage']
        
        // set the text content of each <li> to the data from the json object
        fullname.textContent = `${personal['name']} ${personal['last_name']}`
        password.textContent = online_info['password']
        email.textContent = online_info['email']
        eyeColor.textContent = personal['eye_color']
        cityCountry.textContent = `${personal['city']}, ${personal['country']}`
        ip.textContent = online_info["ip_address"]

        // Logic for children, married or not
        if (marriage['married'] == true){
            children.textContent = marriage['children']
        }
        else{
            children.textContent = "None"
        }
    })
}

