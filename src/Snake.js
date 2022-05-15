import { useEffect, useState } from "react";
import Board from "./Board";
import {
  GAME_TICK_INTERVAL,
  getInitialState,
  getNextGameState,
  getDirectionByKey,
} from "./gameLogic";

function Snake() {
  const [gameState, setGameState] = useState(getInitialState());

  useEffect(() => {
    const gameTick = () => {
      setGameState((gameState) => getNextGameState({ gameState }));
    };

    const gameTickInterval = setInterval(gameTick, GAME_TICK_INTERVAL);

    return () => clearInterval(gameTickInterval);
  }, []);

  useEffect(() => {
    const handleKeyPress = (key) => {
      setGameState((gameState) => ({
        ...gameState,
        headDirection: getDirectionByKey({ gameState, keyCode: key.code }),
      }));
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  return <Board gameState={gameState} />;
}

export default Snake;
