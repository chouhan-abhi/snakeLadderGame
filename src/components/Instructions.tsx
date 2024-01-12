import React, { useState } from "react";

export const Instructions = () => {
    const [showInstructions, setShowInstructions] = useState(false)

    const handleClick = () => {
        setShowInstructions(prev => !prev)
    }

    const InstructionList = () => (
        <div>
            <ul>
                <li> Alerts when caught by snake or going up the ladder</li>
                <li>
                    Ending positions are mentioned in alert for both snake and ladder
                </li>
                <li>
                    Snake and Ladder starting positions are highlighted in box, ending
                    positions can be seen in js file.
                </li>
                <li>
                    When any one of the players position crosses 100, game is considred
                    over
                </li>
                <li>Once game is over, initial screen rendered to start again</li>
            </ul>
        </div>
    );
        
    return (
        <div>
            <div onClick={handleClick}>{showInstructions ? '- Hide' : '+ Show'} instructions</div>
            {showInstructions && <InstructionList />}
        </div>
    );
};
