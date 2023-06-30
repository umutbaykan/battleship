import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../../socket";
import { useCookies } from "react-cookie";

import { GameStateContext } from "../../App";
import { ChatContext } from "../../App";
import { ErrorContext } from "../../App";

import ChatBox from "./components/ChatBox/ChatBox";
import ShipPlacer from "./components/ShipPlacer/ShipPlacer";
import Board from "./components/Board/Board";
import GameEnd from "./components/GameEnd/GameEnd";

import { whoseTurnIsIt } from "../../utils/turn";

const Game = () => {
  const { pathname } = useLocation();
  const [game_id] = useState(pathname.substring(pathname.lastIndexOf("/") + 1));
  const [, setChats] = useContext(ChatContext);
  const [gameState, setGameState] = useContext(GameStateContext);
  const [error, setError] = useContext(ErrorContext);
  const [cookies, ,] = useCookies(["user_id"]);

  useEffect(() => {
    const handleUserLeaving = () => {
      socket.emit("leave", game_id);
      setGameState();
      setChats([]);
      setError("");
    };

    window.addEventListener("beforeunload", handleUserLeaving);

    return () => {
      window.removeEventListener("beforeunload", handleUserLeaving);
      handleUserLeaving();
    };
  }, []);

  const findBoardInfo = (input) => {
    const your = gameState.players.indexOf(cookies.user_id);
    const opponent = your === 0 ? 1 : 0;
    if (input === "Your") {
      return { index: your, owner: input };
    } else if (input === "Opponent") {
      return { index: opponent, owner: input };
    }
  };

  const fire = (coordinates) => {
    if (error) {
      return;
    } else
      socket.emit("fire", {
        coordinates: coordinates,
        room: gameState.game_id,
      });
  };

  const didIwin = () => {
    return gameState.who_won === cookies.user_id ? true : false;
  };

  if (!gameState) {
    return null;
  }

  return (
    <>
      <h1>Welcome to game {game_id}</h1>
      <ChatBox />
      {gameState.ready === true ? (
        gameState.who_won ? (
          <>
            <GameEnd didIwin={didIwin()} />
            <Board boardInfo={findBoardInfo("Your")} action={() => {}} />
            <Board boardInfo={findBoardInfo("Opponent")} action={() => {}} />
          </>
        ) : (
          <>
            <h3>{whoseTurnIsIt(gameState, cookies.user_id)} turn.</h3>
            <Board boardInfo={findBoardInfo("Your")} action={() => {}} />
            <Board boardInfo={findBoardInfo("Opponent")} action={fire} />
          </>
        )
      ) : (
        <>
          <ShipPlacer boardInfo={findBoardInfo("Your")} />
        </>
      )}
      <h3>{error}</h3>
    </>
  );
};

export default Game;
