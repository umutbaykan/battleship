import GameConfigForm from "./GameConfigForm";

describe("GameConfigForm", () => {
  it("does not throw an error if all values are within allowed boundaries", () => {
    cy.mount(<GameConfigForm />);
    cy.get('[data-cy="board-size"]').clear();
    cy.get('[data-cy="board-size"]').type(9);
    cy.get('[data-cy="destroyer"]').clear();
    cy.get('[data-cy="destroyer"]').type(2);
    cy.get('[data-cy="battleship"]').clear();
    cy.get('[data-cy="battleship"]').type(0);
    cy.get('[data-cy="p2-start"]').click();
    cy.get('[data-cy="gameconfig-submit"]').click();
  });

  it("with too big board, displays must be less than error", () => {
    cy.mount(<GameConfigForm />);
    cy.get('[data-cy="board-size"]').clear();
    cy.get('[data-cy="board-size"]').type(17);
    cy.get('[data-cy="gameconfig-submit"]').click();
    cy.get(".small-text.error").should("contain.text", "Must be 16 or less");
  });

  it("with too small board, displays must be at least error", () => {
    cy.mount(<GameConfigForm />);
    cy.get('[data-cy="board-size"]').clear();
    cy.get('[data-cy="board-size"]').type(4);
    cy.get('[data-cy="gameconfig-submit"]').click();
    cy.get(".small-text.error").should("contain.text", "Must be at least 5");
  });

  it("with negative ships, displays cant have negative ships error", () => {
    cy.mount(<GameConfigForm />);
    cy.get('[data-cy="destroyer"]').clear();
    cy.get('[data-cy="destroyer"]').type(-1);
    cy.get('[data-cy="gameconfig-submit"]').click();
    cy.get(".small-text.error").should(
      "contain.text",
      "Cant have negative ships",
    );
  });

  it("with too many ships, displays lets not go crazy error", () => {
    cy.mount(<GameConfigForm />);
    cy.get('[data-cy="destroyer"]').clear();
    cy.get('[data-cy="destroyer"]').type(6);
    cy.get('[data-cy="gameconfig-submit"]').click();
    cy.get(".small-text.error").should(
      "contain.text",
      "Lets not go crazy captain",
    );
  });
});
