import React from "react";
import { PLAYER_LIMIT } from "./constants";

export const SetPlayers = (props) => {
  const {
    playerCount,
    isPlayerCountValid,
    updatePlayersCount,
    isBoardRendered
  } = props;
  return (
    <div>
      <p>Start game by selecting number of players (Max {PLAYER_LIMIT.max-1} are allowed)</p>
      <div>
        <input
          type="number"
          onChange={updatePlayersCount}
          value={playerCount}
          max={PLAYER_LIMIT.max+1}
          min={PLAYER_LIMIT.min-1}
        />
        {!isPlayerCountValid && (
          <p className="error">Selection is valid from {PLAYER_LIMIT.min + 1} to {PLAYER_LIMIT.max -1}</p>
        )}
        <button
          className="m-l-20"
          disabled={!isPlayerCountValid}
          onClick={isBoardRendered}
        >
          Start
        </button>
      </div>
    </div>
  );
};
