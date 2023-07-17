describe("SignUp", () => {
  it("with valid sign up parameters, logs you in and navigates to home", () => {
    cy.intercept('POST', '/auth/register', { username: "admiral_5", success: true }).as("signUpRequest")
    cy.visit('/signup')
    cy.get('[data-cy="username"]').type("admiral_5");
    cy.get('[data-cy="password"]').type("password");
    cy.get('[data-cy="confirm-password"]').type("password");
    cy.get('[data-cy="signup-submit"]').click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.username).to.eq("admiral_5")
    })
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.get('[data-cy="navbar-username"]').should('contain.text', "admiral_5");
  });
})
