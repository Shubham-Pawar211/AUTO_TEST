
Cypress.Commands.add('getByPlaceholder', (selector, ...args) => {

    return cy.get(`[placeholder=${selector}]`, ...args)
})


Cypress.Commands.add('LogIn', (UserID, passWord) => {

    cy.get('[name="username"]').type(UserID)
    cy.get('[type="password"]').type(passWord)
    cy.get('.orangehrm-login-button').click()

})



Cypress.Commands.add('loginViaApi', (username, password) => {
    cy.request('GET', `${Cypress.env('baseUrl')}/web/index.php/auth/login`)
        .then((response) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(response.body, 'text/html')
            const token = doc.querySelector('input[name="_token"]').value

            cy.log('Fetched Token:', token)

            return cy.request({
                method: 'POST',
                url: `${Cypress.env('baseUrl')}/web/index.php/auth/validate`,
                failOnStatusCode: false,

                form: true,  
                body: {
                    _token: token,
                    username: username,
                    password: password
                }
            });
        })
        .then((loginResponse) => {
            expect(loginResponse.status).to.eq(302)
            cy.log('Login Successful via API')
        });
});



Cypress.Commands.add('getUserDetails', () => {
    const token = window.localStorage.getItem('authToken');

    if (!token) {
        throw new Error('Auth token not found in localStorage')
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const username = payload.username || payload.user || 'Unknown User'

    cy.log('Extracted Username:', username)

    cy.request({
        method: 'GET',
        url: `${Cypress.env('baseApiUrl')}/dashboard/index`,
        failOnStatusCode: false,

        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        cy.wrap(username).as('username')
        return response.body
    });
});