import React, { useState } from "react";
import "./JoinGameButton.css";
import propTypes from "prop-types";

import { joinRoom } from "../../services/room";
import { loadRoom } from "../../services/room";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

export const JoinGameButton = ({ game_id, load }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleJoin = async () => {
    let result;
    load
      ? (result = await loadRoom(game_id))
      : (result = await joinRoom(game_id));
    if (result.success) {
      socket.emit("join", game_id);
      navigate(`/game/${game_id}`);
    } else {
      setError(result.error);
      navigate("/login");
    }
  };

  return (
    <>
      <button data-cy={`${game_id}-join`} className="button-join" key={game_id} onClick={handleJoin}>
        Join!
      </button>
      <p className="small-text error">{error}</p>
    </>
  );
};

JoinGameButton.propTypes = { game_id: propTypes.string, load: propTypes.bool };

export default JoinGameButton;
