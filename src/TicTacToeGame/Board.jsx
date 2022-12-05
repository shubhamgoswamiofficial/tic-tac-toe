import React, { useState, useEffect } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  let [xWins, setXWins] = useState(JSON.parse(localStorage.getItem('xWins')) ?? 0);
  let [oWins, setOWins] = useState(JSON.parse(localStorage.getItem('oWins')) ?? 0);
  let [ties, setTies] = useState(JSON.parse(localStorage.getItem('ties')) ?? 0);



  useEffect(() => {
    let savedState = localStorage.getItem('state')
    let savedTurn = localStorage.getItem('isXTurn')

    if (savedState && savedTurn) {
      setState(JSON.parse(savedState))
      setIsXTurn(JSON.parse(savedTurn))
    }


  }, [])

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }

    return false;
  };

  const isWinner = checkWinner();
  const arrayFull = state.every(element => element === 'X' || element === 'O')



  const handleClick = (index) => {
    if (state[index] !== null) {
      return;
    }
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    localStorage.setItem('state', JSON.stringify(copyState))
    localStorage.setItem('isXTurn', JSON.stringify(isXTurn))


    setState(copyState);
    setIsXTurn(!isXTurn);
  };


  useEffect(() => {
    if (isWinner) {
      switch (isWinner) {
        case 'X':
          localStorage.setItem('xWins', xWins++)
          setXWins(xWins++)
          break
        case 'O':
          localStorage.setItem('oWins', oWins++)
          setOWins(oWins++)
          break
        default:
          break
      }
    }
    else if (arrayFull) {
      localStorage.setItem('ties', ties++)
      setTies(ties++)
    }

  }, [state, isXTurn])


  const handleReset = () => {
    setState(Array(9).fill(null));
    setIsXTurn(JSON.parse(true))
    localStorage.clear()
  };

  return (
    <div className="board-container">
      {arrayFull ? <>
        <span className='cm-text'> Game Draw</span>
        <button onClick={handleReset}>Play Again</button>
      </>
        :
        isWinner ? (
          <>
            <span className='cm-text'> {isWinner} Is The Winner!</span>
            <button onClick={handleReset}>Play Again</button>
          </>
        ) : (
          <>
            <h4 className='cm-text'>Player {isXTurn ? "1" : "2"} {isXTurn ? "(X)" : "(O)"} Turn</h4>
            <button onClick={handleReset}>Reset</button>
            <div className="board-row">
              <Square onClick={() => handleClick(0)} value={state[0]} />
              <Square onClick={() => handleClick(1)} value={state[1]} />
              <Square onClick={() => handleClick(2)} value={state[2]} />
            </div>
            <div className="board-row">
              <Square onClick={() => handleClick(3)} value={state[3]} />
              <Square onClick={() => handleClick(4)} value={state[4]} />
              <Square onClick={() => handleClick(5)} value={state[5]} />
            </div>
            <div className="board-row">
              <Square onClick={() => handleClick(6)} value={state[6]} />
              <Square onClick={() => handleClick(7)} value={state[7]} />
              <Square onClick={() => handleClick(8)} value={state[8]} />
            </div>
          </>
        )}

      <h4 className='cm-text'>Scores:</h4>
      <span className='cm-text'>  Ties : {ties}</span> <br />
      <span className='cm-text'>  Player 1 (X) : {xWins}</span> <br />
      <span className='cm-text'>  Player 2 (O) : {oWins}</span> <br />
    </div>
  );
};

export default Board;
