// create a board
function createBoard() {
  const arr = [];

  for (let r = 0; r < 8; r++) {
    arr.push([]);

    for (let c = 0; c < 8; c++) {
      arr[r].push(r + "," + c);
    }
  }

  return arr;
}

const chessBoard = createBoard();
console.log(chessBoard);

function Node(row, col, dis) {
  return {
    row,
    col,
    dis,
  };
}

// 1. learn how to make the visited set only with unique values
const moves = [
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

const getNeighbors = (curRow, curCol) => {
  const neighbors = [];

  for (const direction of moves) {
    const [x, y] = direction;

    const nRow = x + curRow;
    const nCol = y + curCol;

    if (nRow >= 0 && nRow <= 7 && nCol >= 0 && nCol <= 7) {
      neighbors.push([nRow, nCol]);
    }
  }

  return neighbors;
};

function moveKnight(start, end) {
  // all possible moves

  let queue = [[start]];
  const visited = new Set();

  while (queue.length > 0) {
    // remove node
    const path = queue.shift();
    const current = path[path.length - 1];
    const row = current[0];
    const col = current[1];

    // process node
    if (row === end[0] && col === end[1]) {
      return path;
    }

    // add the steps
    for (const el of getNeighbors(row, col)) {
      const [x, y] = el;

      if (!visited.has([x, y].toString())) {
        visited.add([x, y].toString());
        const newpath = [...path, [x, y]];
        queue.push(newpath);
      }
    }
  }
}

console.log(moveKnight([7, 0], [0, 7]));
