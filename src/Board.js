import { BOARD_SIZE, isPositionInArray } from "./gameLogic";
import "./Board.css";

const Board = ({ gameState }) => {
  const classNameByCellState = ({ rowIndex, cellIndex }) => {
    const classNames = ["cell"];
    if (
      gameState.headPosition[0] === rowIndex &&
      gameState.headPosition[1] === cellIndex
    ) {
      classNames.push("head");
      classNames.push(gameState.headDirection.name);
      return classNames.join(" ");
    }

    if (isPositionInArray([rowIndex, cellIndex], gameState.tailPositions)) {
      classNames.push("tail");
      return classNames.join(" ");
    }

    if (
      gameState.foodPosition[0] === rowIndex &&
      gameState.foodPosition[1] === cellIndex
    ) {
      classNames.push("food");
      return classNames.join(" ");
    }
    return classNames.join(" ");
  };

  return (
    <div className="container">
      <div className="board">
        {Array(BOARD_SIZE)
          .fill(0)
          .map((row, rowIndex) => {
            return (
              <div className="row" key={rowIndex}>
                {Array(BOARD_SIZE)
                  .fill(0)
                  .map((cell, cellIndex) => {
                    return (
                      <div
                        className={classNameByCellState({
                          rowIndex,
                          cellIndex,
                        })}
                        key={`${rowIndex}${cellIndex}`}
                      ></div>
                    );
                  })}
              </div>
            );
          })}
      </div>
      <div className="max-score">
          <span>Your max score is: <strong>{gameState.maxScore}</strong></span>
      </div>
    </div>
  );
};

export default Board;
