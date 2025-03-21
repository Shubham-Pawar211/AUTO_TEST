const { LogIn } = require("../pageObject/loginPage");

describe('Dashboard page Test cases', () => {

    const log_In = new LogIn();

    beforeEach(() => {
        cy.visit('/');
        log_In.enterUsername(Cypress.env('username'));
        log_In.enterPassword(Cypress.env('password'));
        log_In.clickLoginBtn();
    });



    it('Validates user is redirected to the Dashboard after login', () => {

        cy.url().should('include', '/dashboard');
        cy.get('.oxd-topbar-header-title').should('include.text', 'Dashboard');
    });


        it('Verify that the correct user name is displayed on dashboard', function () {
            
        cy.fixture('example').then((data) => {
            cy.get('.oxd-userdropdown-name')
                .should('exist') 
                .and('be.visible')
                .and('contain', data.validUser.name); 
        });
    });
    

    it('Validates the presence of main navigation items', () => {

        const menuItems = ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info', 'Dashboard', 'Maintenance'];

        menuItems.forEach((item) => {
            cy.get('.oxd-sidepanel .oxd-main-menu-item').contains(item).should('be.visible');
        });
    });


    it('Checks responsiveness using different viewports', () => {

        const viewports = ['macbook-15', 'ipad-2', 'iphone-x'];

        viewports.forEach((viewport) => {
            cy.viewport(viewport);
            cy.get('.oxd-topbar-header-breadcrumb').should('be.visible');
        });
    });
});
