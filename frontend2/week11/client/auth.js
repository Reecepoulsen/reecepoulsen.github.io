import { makeRequest } from "./authHelpers.js";

const baseURL = 'http://127.0.0.1:3000/';


export class Auth {
    constructor(errorHandler) {
        this.jwtToken = '';
        this.user = {};
        this.errors = errorHandler;
    }

    async login(callback) {
        const email = document.getElementById("email-input")
        const password = document.getElementById("password-input")
        const postData = {
            email: email.value,
            password: password.value
        };
        try {
            
            // 1. use the makeRequest function to pass our credentials to the server
            const data = await makeRequest('login', 'POST', postData)
            this.jwtToken = data.accessToken;
            // console.log("Token", this.jwtToken)
            
            this.user = await this.getCurrentUser(email.value);
            // console.log(data);
            // console.log("user = ", this.user)
            // 2. if we get a successful response...we have a token! Store it since we will 
            // need to send it with every request to the API.
            // if(response.ok){
            //     let token = response.accessToken
            //     this.token(token)
            // }
            
            document.getElementById('login').classList.add('hidden')
            password.value = ''
        
            this.errors.clearError();
            callback();

        } catch (error) {
            this.errors.handleError(error)
            console.log(error);
        }
    }

    // uses the email of the currently logged in user to pull up the full user details for that user from the database
    async getCurrentUser(email) {
        try{
            // 3. add the code here to make a request for the user identified by email... don't forget to send the token!
            const data = await makeRequest(
                'users?email=' + email,
                'GET',
                null,
                this.jwtToken
            );

            // console.log(data);
            return data[0];

        } catch (error) {
            this.errors.errorHandler(error, showLogin);
            console.log(error);
        }
    }
        
    set token(value) {

    }

    get token() {
        return this.jwtToken
    }
} // end auth class

function showLogin() {
    document.getElementById('login').classList.remove('hidden')
}