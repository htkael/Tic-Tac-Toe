function gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(cell());
    }
  }

  const getBoard = () => board;

  const placeMarker = (row, column, player) => {
    board[row][column].setValue(player);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, placeMarker, printBoard };
}

function cell() {
  let value = 0;

  const setValue = (player) => {
    value = player;
  };

  const getValue = () => value;
  return { value, setValue, getValue };
}

function gameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = gameboard();

  const players = [
    { name: playerOneName, token: 1 },
    { name: playerTwoName, token: 2 },
  ];

  let activePlayer = players[0];

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const getCellValue = (row, column) =>
    board.getBoard()[row][column].getValue();

  const playRound = (row, column) => {
    if (getCellValue(row, column) === 0) {
      console.log(
        `Dropping ${getActivePlayer().name}'s marker on (${row}, ${column})`
      );
      board.placeMarker(row, column, getActivePlayer().token);
      // add logic to check if there is a winner
      switchPlayer();
      printNewRound();
    } else {
      console.log(
        `Sorry, ${
          getActivePlayer().name
        } ,this spot has already been taken. Try again.`
      );
      printNewRound();
    }
  };

  printNewRound();

  return { playRound, getActivePlayer };
}
const game = gameController();
