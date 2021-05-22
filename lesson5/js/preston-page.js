// enables hamburger menu
function toggleMenu() {
    document.getElementById("navigation").classList.toggle("hide");
}

// JS to get the current date for the footer
let date = new Date();

let dayNum = date.getDay();
let dayName = null;
switch (dayNum) {
    case 0:
        dayName = 'Sunday';
        break;
    case 1:
        dayName = 'Monday';
        break;
    case 2:
        dayName = 'Tuesday';
        break;
    case 3:
        dayName = 'Wednesday';
        break;
    case 4:
        dayName = 'Thursday';
        break;
    case 5:
        dayName = 'Friday';
        break;
    case 6:
        dayName = 'Saturday';
        break;
}

let month = date.toLocaleString('default', { month: 'long'})

document.getElementById("cur-year").textContent = date.getFullYear();
document.getElementById("cur-date").textContent = " | " + dayName + ", " +  date.getDate() + " " + month + " " + date.getFullYear();

// Add notifcation for pancakes every friday
if (dayNum == 5) {
    document.getElementById("notification").classList.toggle("hide")
}

// wayfinding for navbar
let fileName = location.pathname.split("/").slice(-1)
let fileString = fileName[0]
let pageName = fileString.split("-")[0]
console.log(pageName)
switch (pageName) {
    case "preston":
        document.getElementById("preston-link").classList.toggle("active")
        break;
    case "soda":
        document.getElementById("soda-link").classList.toggle("active")
        break;
    case "fish":
        document.getElementById("fish-link").classList.toggle("active")
        break;
    case "storm":
        document.getElementById("storm-link").classList.toggle("active")
        break;    
    case "gallery":
        document.getElementById("gallery-link").classList.toggle("active")
        break;
    default:
        document.getElementById("home-link").classList.toggle("active")
        break;
}
