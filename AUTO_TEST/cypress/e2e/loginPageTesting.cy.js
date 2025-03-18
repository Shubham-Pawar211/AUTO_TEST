
beforeEach(() => {
    cy.visit('/')
    cy.fixture('example').as('jsonData')

});


describe('Login Page Testing', () => {

    it('login using data from cypress environment json', () => {
        cy.getByPlaceholder('Username').type(Cypress.env('username'))
        cy.getByPlaceholder('Password').type(Cypress.env('password'))
        cy.get('button').contains(' Login ').click()

        cy.url().should('include', '/dashboard')
        cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard')
    });


    it('Validates successful login with admin credentials', function () {

        cy.intercept('POST', '/web/index.php/events/push').as('login')

        cy.getByPlaceholder('Username').type(this.jsonData.validData.uname)
        cy.getByPlaceholder('Password').type(this.jsonData.validData.pwd)
        cy.get('button').contains(' Login ').click()

        cy.wait('@login').its('response.statusCode').should('eq', 200)

        cy.url().should('include', '/dashboard')
        cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard')
    });



    it('Validate "Required" error message for empty username and password', () => {

        cy.get('button').contains(' Login ').click()

        cy.get('.oxd-input-group__message').eq(0).should('contain', 'Required')
        cy.get('.oxd-input-group__message').eq(1).should('contain', 'Required')

    });


    it('Validate error message for incorrect credentials', function () {
        cy.getByPlaceholder('Username').type(this.jsonData.invalidData.uname)
        cy.getByPlaceholder('Password').type(this.jsonData.invalidData.pwd)
        cy.get('button').contains(' Login ').click()

        cy.get('.oxd-alert-content-text').should('be.visible')
            .and('contain', 'Invalid credentials')
    });
});
