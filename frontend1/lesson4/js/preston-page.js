function toggleMenu() {
    document.getElementById("navigation").classList.toggle("hide");
}

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