import React from "react";
import propTypes from "prop-types";
import "./GamesPlayed.css";
import { useCookies } from "react-cookie";

import Won from "./Won/Won";
import Loss from "./Loss/Loss";
import Unfinished from "./Unfinished/Unfinished";

const GamesPlayed = ({ gamesHistory }) => {
  const [cookies, ,] = useCookies(["user_id"]);

  const parseGame = (game) => {
    const { who_won, game_id } = game;
    let result;
    if (who_won === cookies.user_id) {
      result = <Won key={game_id} game={game} />;
    } else if (who_won === null) {
      result = <Unfinished key={game_id} game={game} />;
    } else {
      result = <Loss key={game_id} game={game} />;
    }
    return result;
  };

  return (
    <>
      <div className="history-container" key="history-container">
        <h3>Your games so far:</h3>
        {gamesHistory.map((game) => {
          return parseGame(game);
        })}
      </div>
    </>
  );
};

GamesPlayed.propTypes = { gamesHistory: propTypes.array };

export default GamesPlayed;