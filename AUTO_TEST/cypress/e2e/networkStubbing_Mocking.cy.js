describe('Stub API Responses for Login', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Mock a successful login response', () => {
        cy.intercept('GET', '/web/index.php/api/v2/dashboard/shortcuts', {
            statusCode: 200,
            body: { token: "mocked_token", message: "Login Successful" }
        }).as("stubLogin")

        cy.LogIn('Admin', 'admin123')

        cy.wait('@stubLogin').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/dashboard')
    });

    it('Mock a failed login response', () => {
        cy.intercept('POST', '/web/index.php/auth/validate', {
            statusCode: 401,
            body: { message: "Invalid credentials" }
        }).as('stubFailedLogin');

        cy.LogIn('admin', 'ADMIN123')

        cy.wait("@stubFailedLogin").then((interception) => {
            expect(interception.response.statusCode).to.eq(401)
        });
        // cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
    });


    it('Intercept the Dashboard API Response', () => {
        cy.intercept("GET", "/web/index.php/dashboard/index", {
            statusCode: 200,
            body: {
                dashboard: {
                    welcomeMessage: "Welcome dear User!",
                    recentActivities: ["Task 1", "Task 2", "Task 3"]
                }
            }
        }).as("getDashboard");

        cy.LogIn('Admin', 'admin123')
        cy.wait("@getDashboard");
        cy.get('@getDashboard').its('response.statusCode').should('eq', 200)
        //   cy.get('.oxd-topbar-header-breadcrumb').should('contain', 'Dashboard')
    });

});
