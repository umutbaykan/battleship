import React, { useContext } from "react";

import JoinGameButton from "../../../../components/JoinGameButton/JoinGameButton";
import AllowedShipDisplayer from "../../../../components/AllowedShipDisplayer/AllowedShipDisplayer";

import { LobbyContext } from "../../../../App";

export const CurrentGames = () => {
  const currentGames = useContext(LobbyContext);

  return (
    <div className="container lobby">
      <h4>Lobby</h4>
      <p>Open games are displayed here.</p>
      {Object.keys(currentGames).length === 0 && (
        <p className="error small-text">
          Sorry, looks like there are no open games at the moment.
        </p>
      )}
      {Object.keys(currentGames).map((key) => (
        <div className="container game" key={key}>
          <p data-cy={`${key}-lobby-host`} className="small-text">
            Host: {currentGames[key].players}
          </p>
          <p data-cy={`${key}-lobby-size`} className="small-text">
            Board Size: {currentGames[key].size}
          </p>
          <p className="small-text">Ships:</p>
          <AllowedShipDisplayer
            allowedShips={currentGames[key].allowed_ships}
          />
          <JoinGameButton game_id={key} load={false} />
        </div>
      ))}
    </div>
  );
};

export default CurrentGames;
