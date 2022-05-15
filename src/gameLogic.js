export const BOARD_SIZE = 20;
export const GAME_TICK_INTERVAL = 100;

export const DIRECTIONS = {
  DOWN: { name: "down", values: [1, 0] },
  UP: { name: "up", values: [-1, 0] },
  LEFT: { name: "left", values: [0, -1] },
  RIGHT: { name: "right", values: [0, 1] },
};

export const getInitialState = ({ gameState } = {}) => {
  return {
    headPosition: [0, 2],
    headDirection: DIRECTIONS.RIGHT,
    foodPosition: getRandomFoodPosition(),
    maxScore: gameState ? gameState.maxScore : 0,
    tailPositions: [
      [0, 1],
      [0, 0],
    ],
  };
};

export const isPositionInArray = (position, positionsArray) => {
  if (!positionsArray) return false;
  return !!positionsArray.find(
    (p) => p[0] === position[0] && p[1] === position[1]
  );
};

export const getRandomFoodPosition = ({ gameState } = {}) => {
  const randomPosition = () => [
    parseInt(Math.random() * BOARD_SIZE),
    parseInt(Math.random() * BOARD_SIZE),
  ];

  const excludePositions = gameState
    ? [...gameState.tailPositions, gameState.headPosition]
    : [];

  let newPositionFound = false;
  let newRandomPosition;
  while (!newPositionFound) {
    newRandomPosition = randomPosition();
    newPositionFound =
      newPositionFound ||
      !isPositionInArray(newRandomPosition, excludePositions);
  }
  return newRandomPosition;
};

export const getNextSnakePosition = ({ gameState }) => {
  let newHeadPosition = [
    gameState.headPosition[0] + gameState.headDirection.values[0],
    gameState.headPosition[1] + gameState.headDirection.values[1],
  ];

  let newTailPositions = gameState.tailPositions.map((t, i) => {
    if (i === 0) {
      return gameState.headPosition;
    } else {
      return gameState.tailPositions[i - 1];
    }
  });

  return {
    headPosition: newHeadPosition,
    tailPositions: newTailPositions,
  };
};

export const getDirectionByKey = ({ gameState, keyCode }) => {
  const KEYS_DIRECTIONS = {
    ArrowUp: DIRECTIONS.UP,
    ArrowDown: DIRECTIONS.DOWN,
    ArrowRight: DIRECTIONS.RIGHT,
    ArrowLeft: DIRECTIONS.LEFT,
  };
  const CONSTRAINS = {
    [DIRECTIONS.UP.name]: DIRECTIONS.DOWN.name,
    [DIRECTIONS.DOWN.name]: DIRECTIONS.UP.name,
    [DIRECTIONS.LEFT.name]: DIRECTIONS.RIGHT.name,
    [DIRECTIONS.RIGHT.name]: DIRECTIONS.LEFT.name,
  };

  const nextDirection = KEYS_DIRECTIONS[keyCode];

  return CONSTRAINS[gameState.headDirection.name] === nextDirection.name
    ? gameState.headDirection
    : nextDirection;
};

export const getGrownTail = ({ gameState }) => {
  return [
    ...gameState.tailPositions,
    gameState.tailPositions[gameState.tailPositions.length - 1],
  ];
};

export const checkLost = ({ gameState }) => {
  if (isPositionInArray(gameState.headPosition, gameState.tailPositions))
    return true;
  if (
    gameState.headPosition[0] < 0 ||
    gameState.headPosition[0] >= BOARD_SIZE ||
    gameState.headPosition[1] < 0 ||
    gameState.headPosition[1] >= BOARD_SIZE
  )
    return true;
  return false;
};

export const getNextGameState = ({ gameState }) => {
  const nextSnakePosition = getNextSnakePosition({ gameState });
  let nextState = {
    ...gameState,
    ...nextSnakePosition,
    maxScore:
      nextSnakePosition.tailPositions.length - 2 > gameState.maxScore
        ? nextSnakePosition.tailPositions.length - 2
        : gameState.maxScore,
  };

  if (
    nextSnakePosition.headPosition[0] === gameState.foodPosition[0] &&
    nextSnakePosition.headPosition[1] === gameState.foodPosition[1]
  ) {
    nextState = {
      ...nextState,
      foodPosition: getRandomFoodPosition({ nextState }),
      tailPositions: getGrownTail({ gameState: nextState }),
    };
  }

  if (checkLost({ gameState: nextState })) {
    return getInitialState({ gameState });
  } else {
    return nextState;
  }
};
