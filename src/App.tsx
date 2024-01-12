import React from "react";
import { SetPlayers } from "./utils/SetPlayer";
import { Board } from "./components/Layout";
import { Instructions } from "./components/Instructions";
import Dice from "./components/Dice";
import { SNAKE_POSITIONS, LADDER_POSITIONS, PLAYER_LIMIT, PLAYER_COLORS } from "./utils/constants";
import { NotificationType, getPlayers, notify } from "./utils/utils";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playerCount: PLAYER_LIMIT.min + 1,
      isPlayerCountValid: true,
      isPlayerSelectionHidden: false
    };
  }

  updatePlayersCount = (e) => {
    const { value } = e.target;
    this.setState({
      playerCount: value,
      isPlayerCountValid: value > PLAYER_LIMIT.min || value < PLAYER_LIMIT.max
    });
  };

  initializeGame = () => {
    let playersState = {};
    for (let i = 1; i <= this.state.playerCount; i++) {
      playersState[`P${i}`] = {
        currentPosition: 0
      };
    }
    this.setState({
      isBoardRendered: true,
      isPlayerSelectionHidden: true,
      ...playersState,
      playersTurn: "P1"
    });
  };

  checkSnakeOrLadder = () => {
    const currentChance = this.state.playersTurn;
    const currentPlayerPostion = this.state[currentChance].currentPosition;
    SNAKE_POSITIONS.forEach(obj => {
      if (obj.currentPosition === currentPlayerPostion) {
        notify(
          `Player ${currentChance} Got Caught by Snake, Moaved to ${obj.gotoPosition
          }`
        );
        this.setState({
          [currentChance]: {
            currentPosition: obj.gotoPosition
          }
        });
      }
    });
    LADDER_POSITIONS.forEach(obj => {
      if (obj.currentPosition === currentPlayerPostion) {
        notify(
          `Player ${currentChance}! Ladder taking you to position ${obj.gotoPosition
          }`
        );
        this.setState({
          [currentChance]: {
            currentPosition: obj.gotoPosition
          }
        });
      }
    });
  };
  
  updatePlayerPosition = () => {
    const currentChance = this.state.playersTurn;
    const currentPlayerPostion = this.state[currentChance].currentPosition;

    if (currentPlayerPostion + this.state.diceValue >= 100) {
      notify(`Game Over! Congrats ${currentChance}`, NotificationType.success);
      this.setState({
        playerCount: 2,
        isPlayerSelectionHidden: false,
        isBoardRendered: false
      });
      return;
    }
    this.setState(
      {
        [currentChance]: {
          currentPosition: currentPlayerPostion + this.state.diceValue
        }
      },
      this.checkSnakeOrLadder
    );
  };

  updateTurn = () => {
    const { playersTurn, playerCount } = this.state;
    const currentChance = playersTurn;
    const playerIndex = currentChance.replace('P', '');
    const updatedPlayerIndex = playerIndex === playerCount.toString() ? 'P1' : `P${Number(playerIndex) + 1}`;
    this.setState({ playersTurn: updatedPlayerIndex });
  };

  getDiceValue = (diceRolledValue: number) => {
    this.setState(
      { diceValue: diceRolledValue },
      this.updatePlayerPosition
    );
    this.updateTurn();
  };

  PlayerIcon = (playerDetails:{playerName: string, index: number}) => {
    const {playerName, index} = playerDetails;
    return <div className={`playerIndicator`} style={{ backgroundColor: PLAYER_COLORS[index], display: "inline-block", padding: '1px' }}> {playerName}</div>
  };

  LeftContainer = () => {
    const {
      playerCount,
      isPlayerCountValid,
      isBoardRendered,
      isPlayerSelectionHidden,
      playersTurn
    } = this.state;
    return (
      <div className="left-container">
        <h1>Snake & Ladders</h1>
        {!isPlayerSelectionHidden && (
          <SetPlayers
            isPlayerCountValid={isPlayerCountValid}
            playerCount={playerCount}
            updatePlayersCount={this.updatePlayersCount}
            isBoardRendered={this.initializeGame}
          />
        )}
        {isBoardRendered && (
          <>
            <p>Players are { 
              getPlayers(playerCount)?.trim()?.split(' ')?.map( (playerName, index) => <this.PlayerIcon playerName={playerName} index={index} /> )
              }
            </p>
            <p>Turn <this.PlayerIcon playerName={playersTurn} index={parseInt(playersTurn.replace('P','')) - 1} /></p>
            <Dice rollDice={this.getDiceValue} />
          </>
        )}
        <Instructions />
      </div>
    )
  }

  RightContainer = () => {
    const { isBoardRendered } = this.state;
    return (<div className="right-container">
      {isBoardRendered && <Board updatedState={this.state} />}
    </div>)
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <this.LeftContainer />
        <this.RightContainer />
      </div>
    );
  }
}

export default App;
