describe('API Login Testing', () => {

  it('log in via API and verify user details', function () {
    cy.loginViaApi(Cypress.env('username'), Cypress.env('password'));

    cy.getUserDetails().then((user) => {
      expect(user.username).to.eq(Cypress.env('username'));
    });
  });

});
