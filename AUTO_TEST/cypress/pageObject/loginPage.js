export class LogIn {

    logIn_username = '[placeholder="Username"]';
    logIn_password = '[placeholder="Password"]';
    logIn_button = '.orangehrm-login-button';

    enterUsername(UserID) {
        cy.get(this.logIn_username).type(UserID);
    }

    enterPassword(passWord) {
        cy.get(this.logIn_password).type(passWord);
    }

    clickLoginBtn() {
        cy.get(this.logIn_button).click();
    }
}
