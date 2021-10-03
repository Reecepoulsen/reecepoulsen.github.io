# Overview: User Admin Dashboard
## Description
This software allows someone to create, view, edit, and remove users from a database.
It gets input from users using HTML input boxes, then it operates on that input depending on which of the options that they user had selected. A new user can be made by clicking
the "create user" button. When clicked, input boxes will appear asking for a new user id, username, and email address. Clicking the "view users" button will pull up all of the stored
users and their information. In order to edit a user, you provide the unique user ID and then you can enter in a new username and email address. Removing a user is as simple as
entering the desired user id to be deleted from the database. 

Writing this software helped me learn how to perform basic operations using a cloud database. It has helped me to understand how to get user input using HTML 
elements and JavaScript and how to manipulate the DOM to show output as well. I also learned a lot about interacting with google firebase's documentation throughout the project.  

## [Video Demonstrating Software](https://youtu.be/MdV4Kamv6Q4)

# Cloud Database
For this project I used Google Firebase's realtime database. I decided to use the realtime database rather than firebase itself because the scope of the project could 
easily be contained within the realtime database without all of the extra optimizations that firebase provides 

The structure of the database is quite simple. There is a users collection that contains keys that act as userId's, the value to each of the userId's is another object
containing the username and email address for that user. 

# Development Environment 
- Visual Studio Code
- Google Firebase Console
- Github Pages for hosting

## Languages and Libraries
This software is written using HTML, CSS, and JavaScript. The HTML and CSS were used
purely for presentation purposes. The JavaScript contains the logic that manipulates
the DOM to get user input, query the database, and display the results. Firebase app configuration and database functionality were imported from firebase's libraries. 

Methods and Libraries used:
* initializeApp  from https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js
* getDatabase, ref, set, child, get, update, remove from https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js
 

# Useful Websites

* [Firebase Documentation](https://firebase.google.com/docs/database/web/read-and-write?authuser=0)
* [Firebase Youtube Channel](https://www.youtube.com/channel/UCP4bf6IHJJQehibu6ai__cg)

# Future Work

Things to improve upon in the future
* Validating user input on the frontend
* Make the frontend look better and more user friendly
* Make the frontend responsive to different screen sizes
* See if there is a better way to create HTML elements by creating a factory function that makes them for you.
* Add authentication so only the admin can get to the dashboard