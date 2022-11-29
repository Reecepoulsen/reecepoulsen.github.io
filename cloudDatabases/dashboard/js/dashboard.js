import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, set, child, get, update, remove } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js'

/***************************** SetupFirebase ******************************************/
const firebaseConfig = {
    apiKey: "AIzaSyBGnCGjYp2uXMIeaXWnyUA9nMZhTobUFEA",
    authDomain: "chords-login.firebaseapp.com",
    databaseURL: "https://chords-login-default-rtdb.firebaseio.com/",
    storageBucket: "chords-login.appspot.com"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
/**************************************************************************************/

// Helper function 
const setupInputContainer = () => {
    if (document.body.contains(document.getElementById("input-container"))){
        document.getElementById("input-container").remove();
    }

    let inputContainer = document.createElement('div');
    inputContainer.id = "input-container";
    inputContainer.className = "tile";

    return inputContainer;
};

// create user functionality
document.getElementById("create-btn").addEventListener("click", () => {
    const inputContainer = setupInputContainer();

    let header = document.createElement('h2');
    let userIdInput = document.createElement('input');
    let usernameInput = document.createElement('input');
    let emailInput = document.createElement('input');
    let createBtn = document.createElement("button");
    
    header.textContent = "Create A New User";
    userIdInput.placeholder = "User Id";
    usernameInput.placeholder = "Username";
    emailInput.placeholder = "Email";
    createBtn.textContent = "Create";

    inputContainer.append(header);
    inputContainer.append(userIdInput)
    inputContainer.append(usernameInput)
    inputContainer.append(emailInput)
    inputContainer.append(createBtn);
    document.getElementById('main').append(inputContainer)

    // Takes a user id, name, and email and writes it to
    // the database in the users collection
    const writeUserData = (userId, name, email) => {
        set(ref(database, `users/${userId}`), {
            username: name,
            email: email
        })
        console.log("User Added!")
    }

    createBtn.addEventListener("click", () => {
        let userId = userIdInput.value;
        let username = usernameInput.value;
        let email = emailInput.value;
    
        writeUserData(userId, username, email);

        // Clear input fields
        userIdInput.value = "";
        usernameInput.value = "";
        emailInput.value = "";
    });
})

// view users functionality
document.getElementById("view-btn").addEventListener("click", () => {
    const inputContainer = setupInputContainer();

    let header = document.createElement("h2");
    let ul = document.createElement("ul");

    header.textContent = "All Users";

    // If you need the data only once, you can use get() to get a snapshot 
    // of the data from the database
    const dbRef = ref(database);
    get(child(dbRef, `users`)).then((snapshot) => {
        if (snapshot.exists()) {
            const usersObj = snapshot.val();

            for (const key in usersObj) {
                let li = document.createElement('li');
                li.textContent = `${key} --> ${usersObj[key].username} --> ${usersObj[key].email}`;
                ul.append(li);
            } 
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    inputContainer.append(header);
    inputContainer.append(ul);
    document.getElementById('main').append(inputContainer);
})

// edit a user functionality
document.getElementById("edit-btn").addEventListener("click", () => {
    const inputContainer = setupInputContainer();

    let header = document.createElement("h2");
    let userIdInput = document.createElement("input");
    let newHeader = document.createElement("h3");
    let usernameInput = document.createElement("input");
    let emailInput = document.createElement("input");
    let editBtn = document.createElement("button");

    header.textContent = "Enter User ID to Edit";
    newHeader.textContent = "Enter the New Information";
    editBtn.textContent = "Change User"

    userIdInput.placeholder = "User ID";
    usernameInput.placeholder = "Username";
    emailInput.placeholder = "Email";

    inputContainer.append(header);
    inputContainer.append(userIdInput);
    inputContainer.append(newHeader);
    inputContainer.append(usernameInput);
    inputContainer.append(emailInput);
    inputContainer.append(editBtn);
    document.getElementById('main').append(inputContainer);

    function updateUser (userId, newUsername, newEmail) {
        update(ref(database, 'users/' + userId), {
            username: newUsername,
            email: newEmail
        })      
    };

    editBtn.addEventListener("click", () => {
        const userId = userIdInput.value;
        const newUsername = usernameInput.value;
        const newEmail = emailInput.value;

        updateUser(userId, newUsername, newEmail);

        // Clear input fields
        userIdInput.value = "";
        usernameInput.value = "";
        emailInput.value = "";
    })
})

// remove a user functionality
document.getElementById("remove-btn").addEventListener("click", () => {
    const inputContainer = setupInputContainer();

    let header = document.createElement("h2");
    let userIdInput = document.createElement("input");
    let removeBtn = document.createElement("button");

    header.textContent = "Input User ID to Remove"
    userIdInput.placeholder = "user ID";
    removeBtn.textContent = "Remove User";

    inputContainer.append(header);
    inputContainer.append(userIdInput);
    inputContainer.append(removeBtn);
    document.getElementById('main').append(inputContainer);

    removeBtn.addEventListener("click", () => {
        let userId = userIdInput.value;
        remove(ref(database, 'users/' + userId));

        // clear input field
        userIdInput.value = "";
    })
})