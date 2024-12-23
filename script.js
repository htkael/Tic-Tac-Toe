// Create the game with an empty 9 element array
function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const placeMarker = (row, column, player) => {
    board[row][column].addMarker(player);
  };
  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, placeMarker, printBoard };
}

function Cell() {
  let value = 0;
  const addMarker = (player) => {
    value = player;
  };
  const getValue = () => value;
  return { addMarker, getValue };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();

  const players = [
    { name: playerOneName, marker: 1 },
    { name: playerTwoName, marker: 2 },
  ];

  let activePlayer = players[0];

  const switchTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    console.log(
      `Placing ${getActivePlayer().name}'s marker on cell: ${row}, ${column}`
    );
    board.placeMarker(row, column, getActivePlayer().marker);
    switchTurn();
    printNewRound();
  };
  printNewRound();
  return { playRound, getActivePlayer };
}

const game = GameController();
// Create player one - name

// Create plater two -name

// Create function to play game
