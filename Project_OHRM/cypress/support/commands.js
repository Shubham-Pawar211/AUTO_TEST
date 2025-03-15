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

// to login via API
// Cypress.Commands.add("loginViaApi", (username, password) => {
//     cy.request({
//         method: "GET",
//         url: `${Cypress.env("baseApiUrl")}/login`,
//         body: { username, password }
//     }).then((response) => {
//         expect(response.status).to.eq(200);
//         window.localStorage.setItem("authToken", response.body.token);
//     });

// });

Cypress.Commands.add("loginViaApi", (username, password) => {
    return cy.request('GET', `${Cypress.env('baseApiUrl')}/auth/login`, { username, password })
        .then((response) => {
            expect(response.status).to.eq(200);
            // window.localStorage.setItem('authToken', response.body.token);
        });
})



// to fetch user details via API
Cypress.Commands.add('getUserDetails', () => {
    cy.request({
        method: "GET",
        url: `${Cypress.env("baseApiUrl")}/dashboard/index`,
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem('authToken')}`
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response.body;
    });
});

