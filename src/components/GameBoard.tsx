import React from "react";
import * as R from "ramda";
import { BoardCells } from "./BoardCells";

const Board = ({ updatedState }) => {
  const renderBoxes = R.pipe(
    R.splitEvery(10),
    R.addIndex(R.map)((row, index) => (
      <div className="box-row" key={index}>
        {R.map(box => (
          <div key={box} className="box">
            <span>
              <BoardCells
                boxIndex={box}
                updatedState={updatedState}
                numOfPlayers={updatedState.numOfPlayers}
              />
            </span>
          </div>
        ), row)}
      </div>
    ))
  );

  return <div className="board">{renderBoxes(R.range(1, 101))}</div>;
};

export default Board;
