const { LogIn } = require("../pageObject/loginPage");

describe('Dashboard page Test cases', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    const log_In = new LogIn();

    it('Validates user is redirected to the Dashboard after login', () => {
        log_In.enterUsername(Cypress.env('username'));
        log_In.enterPassword(Cypress.env('password'));
        log_In.clickLoginBtn();
        
        cy.url().should('include', '/dashboard');
        cy.get('.oxd-topbar-header-title').should('include.text', 'Dashboard');
    });

    it('Verify that the user’s name is displayed correctly', () => {
        log_In.enterUsername(Cypress.env('username'));
        log_In.enterPassword(Cypress.env('password'));
        log_In.clickLoginBtn();
        
        cy.get('.oxd-userdropdown-name').should('be.visible')
            .and('contain', 'Le Anh Bao');
    });

    it('Validates the presence of main navigation items', () => {
        log_In.enterUsername(Cypress.env('username'));
        log_In.enterPassword(Cypress.env('password'));
        log_In.clickLoginBtn();
        
        const menuItems = ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info', 'Dashboard', 'Maintenance'];

        menuItems.forEach((item) => {
            cy.get('.oxd-sidepanel .oxd-main-menu-item').contains(item).should('be.visible');
        });
    });

    it('Checks responsiveness using different viewports', () => {
        log_In.enterUsername(Cypress.env('username'));
        log_In.enterPassword(Cypress.env('password'));
        log_In.clickLoginBtn();
        
        const viewports = ['macbook-15', 'ipad-2', 'iphone-x'];

        viewports.forEach((viewport) => {
            cy.viewport(viewport);
            cy.get('.oxd-topbar-header-breadcrumb').should('be.visible');
        });
    });
});
