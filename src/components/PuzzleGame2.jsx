import React, { useState, useEffect } from "react";
import "../App.css";

const PuzzleGame2 = () => {
  const [board, setBoard] = useState(Array(25).fill(null));
  const [pieces, setPieces] = useState([]);
  const [history, setHistory] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let piecesArray = [];
    for (let i = 1; i <= 25; i++) {
      piecesArray.push(`./images3/${i}.jpg`);
    }
    for (let i = piecesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [piecesArray[i], piecesArray[j]] = [piecesArray[j], piecesArray[i]];
    }

    setPieces(piecesArray);
  }, []);

  const checkCompletion = (newBoard) => {
    const correctOrder = Array.from({ length: 25 }, (_, i) => `./images3/${25 - i}.jpg`);
    return newBoard.every((cell, index) => cell === correctOrder[index]);
  };

  const handleDrop = (index) => (event) => {
    event.preventDefault();
    const draggedImage = event.dataTransfer.getData("image");
    const newBoard = [...board];

    if (newBoard[index] === null) {
      setHistory([...history, board]);

      newBoard[index] = draggedImage;
      const newPieces = pieces.filter((piece) => piece !== draggedImage);
      setPieces(newPieces);
      setBoard(newBoard);
      if (checkCompletion(newBoard)) {
        setIsCompleted(true);
      }
    }
  };

  const handleDragStart = (image) => (event) => {
    event.dataTransfer.setData("image", image);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastBoard = history[history.length - 1];
      const revertedBoard = [...lastBoard];

      const revertedPieces = [...pieces];
      const lastPiece = board.find((img, idx) => img !== revertedBoard[idx]);
      if (lastPiece) revertedPieces.push(lastPiece);

      setPieces(revertedPieces);
      setBoard(revertedBoard);
      setHistory(history.slice(0, -1));
      setIsCompleted(false);
    }
  };

  const handleRestart = () => {
    setBoard(Array(25).fill(null));
    setHistory([]);
    setIsCompleted(false);

    let piecesArray = [];
    for (let i = 1; i <= 25; i++) {
      piecesArray.push(`./images3/${i}.jpg`);
    }
    for (let i = piecesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [piecesArray[i], piecesArray[j]] = [piecesArray[j], piecesArray[i]];
    }

    setPieces(piecesArray);
  };

  return (
    <div className="container">
      <div className="controls">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRestart}>Restart</button>
        <button onClick={handleRestart}>Play again</button>
        <button onClick={() => window.location.href = '/'}>Main Page</button>
      </div>
      <div className="game-layout">
        <div className="reference-container">
          <img
            src="./images3/batman.jpg"
            className="reference-image"
            alt="reference"
          />
        </div>
        <div id="board">
          {Array(25)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="grid-cell"
                onDrop={handleDrop(index)}
                onDragOver={(e) => e.preventDefault()}
              >
                {board[index] && (
                  <img
                    src={board[index]}
                    alt={`tile ${index}`}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </div>
            ))}
        </div>
        <div id="pieces-container">
          <div id="pieces">
            {pieces.map((piece, index) => (
              <img
                key={index}
                src={piece}
                alt={`piece ${index}`}
                draggable
                onDragStart={handleDragStart(piece)}
                style={{ width: "79px", height: "79px", margin: "5px" }}
              />
            ))}
          </div>
        </div>
      </div>
      {isCompleted && (
        <div className="congratulations-message">
          <h2>Congratulations! You completed the puzzle!</h2>
        </div>
      )}
    </div>
  );
};
export default PuzzleGame2;
