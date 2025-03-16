// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getByPlaceholder', (selector, ...args) => {

    return cy.get(`[placeholder=${selector}]`, ...args)
})


Cypress.Commands.add('LogIn', (UserID, passWord) => {

    cy.get('[name="username"]').type(UserID)
    cy.get('[type="password"]').type(passWord)
    cy.get('.orangehrm-login-button').click()

})



// Cypress.Commands.add("loginViaApi", (username, password) => {
//     return cy.request('GET', `${Cypress.env('baseApiUrl')}/auth/login`, { username, password })
//         .then((response) => {
//             expect(response.status).to.eq(200);
//             // window.localStorage.setItem('authToken', response.body.token);
//         });
// })

// Cypress.Commands.add("loginViaApi", (username, password) => {
//     return cy.request({
//         method: 'GET',
//         url: `${Cypress.env('baseApiUrl')}/auth/login`,
//         qs: { username, password } 
//     }).then((response) => {
//         expect(response.status).to.eq(200);
//         window.localStorage.setItem('authToken', response.body.token); 
//     });
// });


Cypress.Commands.add("loginViaApi", (username, password) => {
    cy.request('GET', `${Cypress.env('baseUrl')}/web/index.php/auth/login`)
        .then((response) => {
            // Parse the HTML response to extract the CSRF token
            const parser = new DOMParser();
            const doc = parser.parseFromString(response.body, 'text/html');
            const token = doc.querySelector('input[name="_token"]').value;

            cy.log('Fetched Token:', token); // Log for debugging

            // Now perform the login request with the token
            return cy.request({
                method: 'POST',
                url: `${Cypress.env('baseUrl')}/web/index.php/auth/validate`,
                failOnStatusCode: false,

                form: true,  // Important for sending form data
                body: {
                    _token: token,
                    username: username,
                    password: password
                }
            });
        })
        .then((loginResponse) => {
            expect(loginResponse.status).to.eq(302);  // Check if login redirects
            cy.log('Login Successful via API');
        });
});



// to fetch user details via API
// Cypress.Commands.add('getUserDetails', () => {
//     cy.request({
//         method: "GET",
//         url: `${Cypress.env("baseApiUrl")}/dashboard/index`,
//         headers: {
//             Authorization: `Bearer ${window.localStorage.getItem('authToken')}`
//         }
//     }).then((response) => {
//         expect(response.status).to.eq(200);
//         return response.body;
//     });
// });

Cypress.Commands.add('getUserDetails', () => {
    // Retrieve the token from localStorage
    const token = window.localStorage.getItem('authToken');

    if (!token) {
        throw new Error('Auth token not found in localStorage');
    }

    // Decode JWT (Extract username)
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the payload
    const username = payload.username || payload.user || "Unknown User"; // Adjust based on token structure

    cy.log('Extracted Username:', username); // Log for debugging

    // Now, make the API request with the token
    cy.request({
        method: "GET",
        url: `${Cypress.env("baseApiUrl")}/dashboard/index`,
        failOnStatusCode: false,

        headers: {
            Authorization: `Bearer ${token}` // Fixed syntax for Bearer Token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        cy.wrap(username).as('username')
        return response.body
    });
});
