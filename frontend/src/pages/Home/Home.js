import React, { useContext, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

import CurrentGames from "./components/CurrentGames/CurrentGames";
import GameConfigForm from "./components/GameConfigForm/GameConfigForm";

import { socket } from "../../socket";
import { LoggedInContext } from "../../App";
import { createRoom } from "../../services/room";

const Home = () => {
  const [loggedIn] = useContext(LoggedInContext);
  const navigate = useNavigate();
  const [ , setError] = useState("");

  const createGame = async (gameconfigs) => {
    const result = await createRoom(gameconfigs);
    if (result.room) {
      socket.emit("join", result.room);
      navigate(`/game/${result.room}`);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="container">
      <CurrentGames />
      {loggedIn && <GameConfigForm createGame={createGame} />}
    </div>
  );
};

export default Home;
