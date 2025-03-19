describe('Stub API Responses for Login', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.fixture('example').as('jsonData');
    });


    it('Stub API responses for login', function () {
        cy.intercept('GET', '**/dashboard/shortcuts*', {
            statusCode: 200,
        }).as('stubLogin');

        cy.LogIn(Cypress.env('username'), Cypress.env('password'));

        cy.wait('@stubLogin').its('response.statusCode').should('eq', 200);
        cy.url().should('include', '/dashboard');
    });


    it('Mocks a failed login response and verifies error handling', function () {
        cy.intercept('POST', '**/auth/validate*', {
            statusCode: 401
        }).as('stubFailedLogin');

        cy.LogIn(this.jsonData.invalidData.uname, this.jsonData.invalidData.pwd);

        cy.wait('@stubFailedLogin').then((interception) => {
            expect(interception.response.statusCode).to.eq(401);
        });
    });


    it('Intercepts the Dashboard API response and validates data', () => {
        cy.intercept('GET', '**/dashboard/shortcuts*', { statusCode: 200, }).as('getDashboard');

        cy.LogIn(Cypress.env('username'), Cypress.env('password'));
        cy.wait('@getDashboard');
        cy.get('@getDashboard').its('response.statusCode').should('eq', 200);
        cy.get('.oxd-topbar-header-title').should('include.text', 'Dashboard');

    });
});
