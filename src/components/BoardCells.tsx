import React from "react";
import { SNAKE_POSITIONS, LADDER_POSITIONS, PLAYER_COLORS } from "../utils/constants";

export const BoardCells = (props) => {
    const { boxIndex, updatedState } = props;
    const { playerCount } = updatedState;

    const PropsImage = (props: { isLadder: boolean }) => {
        const { isLadder } = props;
        if (isLadder) return <img style={{ width: '32px', height: '32px' }} src="src\assets\ladder.png" alt="snake" />
        return <img style={{ width: '32px', height: '32px' }} src="src\assets\snake.png" alt="snake" />
    }

    const getPlayerNamesArr = () => {
        let arr = [];
        for (let i = 1; i <= playerCount; i++) {
            arr.push(i);
        }
        return arr;
    };
    const checkIfSnakeOrLadderPresent = () => {
        let element;;
        SNAKE_POSITIONS.forEach(snake => {
            if (snake.currentPosition === boxIndex) {
                element = <div className="snake"><PropsImage isLadder={false} /></div>;
            }
        });
        LADDER_POSITIONS.forEach(ladder => {
            if (ladder.currentPosition === boxIndex) {
                element = <div className="ladder"><PropsImage isLadder /></div>;
            }
        });
        return element;
    };
    return (
        <div className="each-box">
            <div className="icons-in-box">
                {getPlayerNamesArr().map((playerName, index) => {
                    return (
                        updatedState['P' + playerName].currentPosition === boxIndex && (
                            <div className={`playerIndicator`} style={{ backgroundColor: PLAYER_COLORS[index] }}> P{playerName}</div>
                        )
                    );
                })}
            </div>
            {checkIfSnakeOrLadderPresent()}
            <div style={{ fontSize: "10px" }}>{boxIndex}</div>
        </div>
    );
};

