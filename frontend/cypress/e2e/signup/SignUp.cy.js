describe("SignUp", () => {
  it("with valid sign up parameters, logs you in and navigates to home", () => {
    cy.intercept("POST", "/auth/register", {
      username: "admiral_5",
      success: true,
    }).as("signUpRequest");
    cy.visit("/signup");
    cy.get('[data-cy="username"]').type("admiral_5");
    cy.get('[data-cy="password"]').type("password");
    cy.get('[data-cy="confirm-password"]').type("password");
    cy.get('[data-cy="signup-submit"]').click();
    cy.wait("@signUpRequest").then((interception) => {
      expect(interception.response.body.username).to.eq("admiral_5");
    });
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.get('[data-cy="navbar-username"]').should("contain.text", "admiral_5");
  });

  it("returns a user already exists message if username is taken", () => {
    cy.intercept("POST", "/auth/register", {
      error: "Username already exists",
    }).as("signUpRequest");
    cy.visit("/signup");
    cy.get('[data-cy="username"]').type("admiral_1");
    cy.get('[data-cy="password"]').type("password");
    cy.get('[data-cy="confirm-password"]').type("password");
    cy.get('[data-cy="signup-submit"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "/signup");
    cy.get('[data-cy="navbar-username"]').should("not.exist");
    cy.get('[data-cy="error-message"]').should(
      "contain.text",
      "Username already exists",
    );
  });
});
