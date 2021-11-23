import { Errors, makeRequest } from "./authHelpers.js";
import {Auth} from "./auth.js";

const myErrors = new Errors('errors');
const auth = new Auth(myErrors);

window.addEventListener("load", () => {
    let loginBtn = document.querySelector(".submit-btn");
    loginBtn.addEventListener("click", () => {
        auth.login(showPosts)
    });
})

async function showPosts(){
    // let postList = await makeRequest(baseURL + 'posts', 'GET', auth.jwtToken)
    // console.log("PostList ", postList)
    const postList = await makeRequest('posts', 'GET', null, auth.jwtToken)
    const ul = document.getElementById("post-list");

    postList.map(post => {
        var li = document.createElement('li');
        console.log(post)
        li.textContent = post.title + " - " + post.content;
        ul.appendChild(li);
    })
}