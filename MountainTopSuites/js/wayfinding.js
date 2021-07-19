let fileName = location.pathname.split("/").slice(-1);
console.log(fileName)

switch (fileName[0]) {
    case "index.html":
        document.getElementById("home-link").classList.toggle("active");
        break;
    case "locations.html":
        document.getElementById("locations-link").classList.toggle("active");
    break;
    case "reservations.html":
        document.getElementById("res-link").classList.toggle("active");
        break;
    case "services.html":
        document.getElementById("services-link").classList.toggle("active");
        break;
    case "contact.html":
        document.getElementById("contact-link").classList.toggle("active");
        break;
}