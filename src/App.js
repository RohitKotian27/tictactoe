import { useState } from 'react';
import './App.css';

function App() {
  const inputArray = new Array(9).fill('');
  const [playArea, setPlayArea] = useState(inputArray);
  const [chance, setChance] = useState('X');
  const [winner, setWinner] = useState('');

  function handleClick(idx) {
    const updatedPlayArea = [...playArea];
    if (!updatedPlayArea[idx] && !winner) {
      updatedPlayArea[idx] = chance;
      checkForWinner(updatedPlayArea);
      checkIfMatchTied(updatedPlayArea);
      setPlayArea(updatedPlayArea);
      setChance((prevChance) => (prevChance === 'X' ? 'O' : 'X'));
    }
  }

  function checkIfMatchTied(updatedPlayArea) {
    const filtered = updatedPlayArea.filter((elem) => elem);
    if (filtered.length === inputArray.length) {
      setWinner((prevValue) => prevValue ? prevValue : 'Match is tied');
    }
  }

  function checkForWinner(area) {
    const winnerResult = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let elem of winnerResult) {
      const [a, b, c] = elem;
      if (area[a] && area[a] === area[b] && area[a] === area[c]) {
        setWinner(
          area[a] === 'X' ? 'Winner is Player 1' : 'Winner is Player 2'
        );
        break;
      }
    }
  }
  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="playContainer">
        {playArea.map((elem, index) => (
          <div
            onClick={() => handleClick(index)}
            className="playSquare"
            key={index}
          >
            {elem}
          </div>
        ))}
      </div>
      <h2>
        {winner
          ? `${winner}`
          : chance === 'X'
          ? 'Turn : Player 1'
          : 'Turn : Player 2'}
      </h2>
      <button
        className="resetBtn"
        onClick={() => {
          setPlayArea(inputArray);
          setChance('X');
          setWinner('');
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;