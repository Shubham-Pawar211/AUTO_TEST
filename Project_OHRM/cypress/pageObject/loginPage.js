
export class LogIn {

    // visitUrl(url) {
    //     cy.visit(url)
    // }


    enterUsername(UserID) {

        cy.get('[placeholder="Username"]').type(UserID)

    }

    enterPassword(passWord) {

        cy.get('[placeholder="Password"]').type(passWord)

    }

    clickLoginBtn() {

        cy.get('.orangehrm-login-button').click()

    }

}


