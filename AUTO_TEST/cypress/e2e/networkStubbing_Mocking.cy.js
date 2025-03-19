beforeEach(() => {
    cy.visit('/');
    cy.fixture('example').as('jsonData');

});


describe('Stub API Responses for Login', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.fixture('example').as('jsonData');
    });

    it('Mock a successful login response', function () {
        cy.intercept('GET', '/web/index.php/api/v2/dashboard/shortcuts', {
            statusCode: 200,
            body: { token: 'mocked_token', message: 'Login Successful' }
        }).as('stubLogin');

        cy.LogIn(this.jsonData.validData.uname, this.jsonData.validData.pwd);

        cy.wait('@stubLogin').its('response.statusCode').should('eq', 200);
        cy.url().should('include', '/dashboard');
    });

    it('Mock a failed login response', function () {
        cy.intercept('POST', '/web/index.php/auth/validate', {
            statusCode: 401,
            body: { message: 'Invalid credentials' }
        }).as('stubFailedLogin');

        cy.LogIn(this.jsonData.invalidData.uname, this.jsonData.invalidData.pwd);

        cy.wait('@stubFailedLogin').then((interception) => {
            expect(interception.response.statusCode).to.eq(401);
        });
    });

    it('Intercept the Dashboard API Response', () => {
        cy.intercept('GET', '/web/index.php/dashboard/index', {
            statusCode: 200,
            body: {
                dashboard: {
                    welcomeMessage: 'Welcome dear User!',
                    recentActivities: ['Task 1', 'Task 2', 'Task 3']
                }
            }
        }).as('getDashboard');

        cy.LogIn(Cypress.env('username'), Cypress.env('password'));
        cy.wait('@getDashboard');
        cy.get('@getDashboard').its('response.statusCode').should('eq', 200);
    });
});
