// create a board
const chessBoardDom = document.getElementById("chessBoard");

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

for (let i = 1; i <= 64; i++) {
  const sq = document.createElement("div");
  sq.classList.add("sq");
  chessBoardDom.appendChild(sq);
}

const chessBoard = createBoard();

function Node(row, col, dis) {
  return {
    row,
    col,
    dis,
  };
}

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
  let queue = [[start]];
  const visited = new Set();

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];
    const row = current[0];
    const col = current[1];

    if (row === end[0] && col === end[1]) {
      return path;
    }

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

moveKnight([7, 0], [6, 2]);

const squares = document.querySelectorAll(".sq");

let state = true;
let nums = [8, 16, 24, 32, 40, 48, 56, 64];

for (let i = 0; i <= 63; i++) {
  nums.forEach((el) => {
    if (i === el) {
      state = !state;
    }
  })

  if (state) {
    squares[i].style.backgroundColor = "#f3ffcf";
    state = false;
  } else {
    squares[i].style.backgroundColor = "#81b64c";
    state = true;
  }
}
