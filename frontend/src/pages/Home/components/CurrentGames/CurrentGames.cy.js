import CurrentGames from "./CurrentGames";
import { LobbyContext } from "../../../../App";
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe("CurrentGames", () => {
  it("displays no games are available if lobby has no games", () => {
    cy.mount(<CurrentGames />);
    cy.get(".error").should(
      "contain.text",
      "Sorry, looks like there are no open games at the moment.",
    );
  });

  it("displays the game information in the container", () => {
    const availableGames = {
      aFKeajFE: {
        who_started: 0,
        allowed_ships: { Cruiser: 1, Destroyer: 3 },
        players: "admiral_1",
        size: 8,
      },
    };
    cy.mount(
      <MemoryRouter initialEntries={["/"]}>
        <LobbyContext.Provider value={availableGames}>
          <Routes>
            <Route path="/" element={<CurrentGames />} />
          </Routes>
        </LobbyContext.Provider>
      </MemoryRouter>,
    );
    cy.get('[data-cy="aFKeajFE-lobby-host"]').should(
      "contain.text",
      "admiral_1",
    );
    cy.get('[data-cy="aFKeajFE-lobby-size"]').should("contain.text", "8");
    cy.get(".allowed-ships > :nth-child(1)").should(
      "contain.text",
      "Cruiser - 1",
    );
    cy.get(".allowed-ships > :nth-child(2)").should(
      "contain.text",
      "Destroyer - 3",
    );
    cy.get('[data-cy="aFKeajFE-join"]').should("be.visible");
  });
});
